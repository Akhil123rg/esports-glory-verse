import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, X, Send, ArrowLeft, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DEMO_TEAMS, demoIdToUuid } from '@/lib/demoTeams';

interface DemoOwnerEntry {
  demoTeamId: string;
  demoTeamName: string;
  demoTeamGame: string;
  demoOwnerName: string;
  teamUuid: string;
  ownerUuid: string;
}

interface DM {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
}

interface ProfileLite {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

interface Conversation {
  partner: ProfileLite;
  lastMessage: DM;
  unread: number;
}

const ChatWidget: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'list' | 'thread' | 'search'>('list');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [profiles, setProfiles] = useState<Record<string, ProfileLite>>({});
  const [activePartner, setActivePartner] = useState<ProfileLite | null>(null);
  const [thread, setThread] = useState<DM[]>([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<ProfileLite[]>([]);
  const threadRef = useRef<HTMLDivElement>(null);

  const totalUnread = useMemo(
    () => conversations.reduce((sum, c) => sum + c.unread, 0),
    [conversations]
  );

  const buildConversations = async (rows: DM[]): Promise<Conversation[]> => {
    if (!user) return [];
    const partnerIds = Array.from(
      new Set(rows.map((r) => (r.sender_id === user.id ? r.recipient_id : r.sender_id)))
    );
    const profileMap: Record<string, ProfileLite> = { ...profiles };
    const missing = partnerIds.filter((id) => !profileMap[id]);
    if (missing.length) {
      const { data } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', missing);
      (data ?? []).forEach((p: any) => (profileMap[p.id] = p));
      setProfiles(profileMap);
    }

    const byPartner = new Map<string, DM[]>();
    rows.forEach((r) => {
      const other = r.sender_id === user.id ? r.recipient_id : r.sender_id;
      const arr = byPartner.get(other) ?? [];
      arr.push(r);
      byPartner.set(other, arr);
    });

    const list: Conversation[] = [];
    byPartner.forEach((arr, other) => {
      arr.sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at));
      const last = arr[arr.length - 1];
      const unread = arr.filter((m) => m.recipient_id === user.id && !m.read_at).length;
      list.push({
        partner: profileMap[other] ?? { id: other, username: 'User', avatar_url: null },
        lastMessage: last,
        unread,
      });
    });
    list.sort((a, b) => +new Date(b.lastMessage.created_at) - +new Date(a.lastMessage.created_at));
    return list;
  };

  // Load conversations + subscribe
  useEffect(() => {
    if (!user) {
      setConversations([]);
      setThread([]);
      setActivePartner(null);
      return;
    }
    let active = true;

    const loadAll = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('direct_messages')
        .select('id, sender_id, recipient_id, content, read_at, created_at')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(500);
      if (error) {
        toast({ title: 'Failed to load chats', description: error.message, variant: 'destructive' });
        setLoading(false);
        return;
      }
      const convs = await buildConversations((data ?? []) as DM[]);
      if (!active) return;
      setConversations(convs);
      setLoading(false);
    };
    loadAll();

    const channel = supabase
      .channel(`dm:${user.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'direct_messages', filter: `recipient_id=eq.${user.id}` },
        async (payload) => {
          const row = payload.new as DM;
          // Hydrate sender profile
          let partner = profiles[row.sender_id];
          if (!partner) {
            const { data } = await supabase
              .from('profiles')
              .select('id, username, avatar_url')
              .eq('id', row.sender_id)
              .maybeSingle();
            partner = (data as ProfileLite) ?? { id: row.sender_id, username: 'User', avatar_url: null };
            setProfiles((p) => ({ ...p, [partner!.id]: partner! }));
          }

          // Append to thread if open
          setThread((prev) =>
            activePartner && (row.sender_id === activePartner.id || row.recipient_id === activePartner.id)
              ? [...prev, row]
              : prev
          );

          // Refresh list
          loadAll();

          // Notify
          toast({
            title: `New message from ${partner.username || 'User'}`,
            description: row.content.slice(0, 80),
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'direct_messages', filter: `sender_id=eq.${user.id}` },
        () => loadAll()
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, activePartner?.id]);

  const openThread = async (partner: ProfileLite) => {
    if (!user) return;
    setActivePartner(partner);
    setView('thread');
    setLoading(true);
    const { data, error } = await supabase
      .from('direct_messages')
      .select('id, sender_id, recipient_id, content, read_at, created_at')
      .or(
        `and(sender_id.eq.${user.id},recipient_id.eq.${partner.id}),and(sender_id.eq.${partner.id},recipient_id.eq.${user.id})`
      )
      .order('created_at', { ascending: true })
      .limit(500);
    if (error) {
      toast({ title: 'Failed to open chat', description: error.message, variant: 'destructive' });
      setLoading(false);
      return;
    }
    setThread((data ?? []) as DM[]);
    setLoading(false);

    // Mark unread as read
    const unreadIds = (data ?? [])
      .filter((m: any) => m.recipient_id === user.id && !m.read_at)
      .map((m: any) => m.id);
    if (unreadIds.length) {
      await supabase
        .from('direct_messages')
        .update({ read_at: new Date().toISOString() })
        .in('id', unreadIds);
    }

    requestAnimationFrame(() => {
      threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
    });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = text.trim();
    if (!content || !user || !activePartner) return;
    setSending(true);
    try {
      const { data, error } = await supabase
        .from('direct_messages')
        .insert({ sender_id: user.id, recipient_id: activePartner.id, content })
        .select()
        .single();
      if (error) throw error;
      setThread((prev) => [...prev, data as DM]);
      setText('');
      requestAnimationFrame(() => {
        threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' });
      });
    } catch (err: any) {
      toast({ title: 'Send failed', description: err.message, variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const runSearch = async (q: string) => {
    setSearch(q);
    if (!q.trim() || !user) {
      setSearchResults([]);
      return;
    }
    const { data } = await supabase
      .from('profiles')
      .select('id, username, avatar_url')
      .ilike('username', `%${q.trim()}%`)
      .neq('id', user.id)
      .limit(10);
    setSearchResults((data ?? []) as ProfileLite[]);
  };

  if (!user) return null;

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chats"
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-esports-accent1 hover:bg-esports-accent1/90 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && totalUnread > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-esports-accent2 text-white border-none h-5 min-w-[20px] px-1 text-xs">
            {totalUnread > 99 ? '99+' : totalUnread}
          </Badge>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[600px] bg-esports-card border border-esports-accent1/20 rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 p-3 border-b border-esports-accent1/20 bg-esports-background">
            {view !== 'list' && (
              <button
                onClick={() => {
                  setView('list');
                  setActivePartner(null);
                  setThread([]);
                }}
                className="text-esports-muted hover:text-white"
                aria-label="Back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className="font-display font-semibold text-white flex-1 truncate">
              {view === 'thread' && activePartner
                ? activePartner.username || 'Chat'
                : view === 'search'
                ? 'New message'
                : 'Messages'}
            </div>
            {view === 'list' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setView('search');
                  setSearch('');
                  setSearchResults([]);
                }}
                className="border-esports-accent1 text-esports-accent1 hover:bg-esports-accent1 hover:text-white"
              >
                New
              </Button>
            )}
          </div>

          {/* Body */}
          {view === 'list' && (
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-5 w-5 animate-spin text-esports-accent1" />
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center text-esports-muted text-sm p-8">
                  No conversations yet. Tap "New" to start one.
                </div>
              ) : (
                conversations.map((c) => (
                  <button
                    key={c.partner.id}
                    onClick={() => openThread(c.partner)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-esports-background border-b border-esports-accent1/10 text-left"
                  >
                    <Avatar className="h-10 w-10">
                      {c.partner.avatar_url && <AvatarImage src={c.partner.avatar_url} />}
                      <AvatarFallback className="bg-esports-accent1/20 text-white text-xs">
                        {(c.partner.username || 'U').substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-white truncate">
                          {c.partner.username || 'User'}
                        </div>
                        {c.unread > 0 && (
                          <Badge className="bg-esports-accent2 text-white border-none h-5 min-w-[20px] px-1 text-xs ml-auto">
                            {c.unread}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-esports-muted truncate">
                        {c.lastMessage.sender_id === user.id ? 'You: ' : ''}
                        {c.lastMessage.content}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}

          {view === 'search' && (
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 border-b border-esports-accent1/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-esports-muted" />
                  <Input
                    autoFocus
                    value={search}
                    onChange={(e) => runSearch(e.target.value)}
                    placeholder="Search players by username…"
                    className="pl-9 bg-esports-background border-esports-accent1/20 text-esports-text"
                  />
                </div>
              </div>
              {searchResults.length === 0 ? (
                <div className="text-center text-esports-muted text-sm p-6">
                  {search ? 'No players found.' : 'Type a username to search.'}
                </div>
              ) : (
                searchResults.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => openThread(p)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-esports-background border-b border-esports-accent1/10 text-left"
                  >
                    <Avatar className="h-10 w-10">
                      {p.avatar_url && <AvatarImage src={p.avatar_url} />}
                      <AvatarFallback className="bg-esports-accent1/20 text-white text-xs">
                        {(p.username || 'U').substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium text-white">{p.username || 'User'}</div>
                  </button>
                ))
              )}
            </div>
          )}

          {view === 'thread' && activePartner && (
            <>
              <div ref={threadRef} className="flex-1 overflow-y-auto p-3 space-y-3">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-5 w-5 animate-spin text-esports-accent1" />
                  </div>
                ) : thread.length === 0 ? (
                  <div className="text-center text-esports-muted text-sm py-8">
                    No messages yet. Say hi!
                  </div>
                ) : (
                  thread.map((m) => {
                    const mine = m.sender_id === user.id;
                    return (
                      <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap break-words ${
                            mine
                              ? 'bg-esports-accent1 text-white'
                              : 'bg-esports-background border border-esports-accent1/10 text-esports-text'
                          }`}
                        >
                          {m.content}
                          <div className={`text-[10px] mt-1 ${mine ? 'text-white/70' : 'text-esports-muted'}`}>
                            {new Date(m.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <form onSubmit={sendMessage} className="p-3 border-t border-esports-accent1/20 flex gap-2">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(e as any);
                    }
                  }}
                  placeholder="Type a message…"
                  className="min-h-[40px] max-h-28 bg-esports-background border-esports-accent1/20 text-esports-text resize-none"
                  maxLength={2000}
                  disabled={sending}
                />
                <Button
                  type="submit"
                  disabled={sending || !text.trim()}
                  className="bg-esports-accent1 hover:bg-esports-accent1/90 text-white self-end"
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
