import React, { useEffect, useRef, useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { isUuid } from '@/lib/uuid';
import { demoIdToUuid, getDemoTeam, isDemoTeam } from '@/lib/demoTeams';

interface TeamMessage {
  id: string;
  team_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: { username: string | null; avatar_url: string | null };
}

interface Props {
  teamId: string;
}

const TeamChat: React.FC<Props> = ({ teamId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<TeamMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const [resolvedTeamId, setResolvedTeamId] = useState<string | null>(null);
  const demo = isDemoTeam(teamId) ? getDemoTeam(teamId) : null;

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  // Resolve teamId (uuid passthrough or demo->uuid + ensure)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isUuid(teamId)) {
        if (!cancelled) setResolvedTeamId(teamId);
        return;
      }
      if (demo) {
        const teamUuid = await demoIdToUuid('team', teamId);
        const ownerUuid = await demoIdToUuid('owner', teamId);
        await supabase.functions.invoke('demo-team-reply', {
          body: {
            mode: 'ensure',
            demoTeamId: teamId,
            demoTeamName: demo.name,
            demoTeamGame: demo.primaryGame,
            demoOwnerName: demo.ownerName,
            ownerUuid,
            teamUuid,
          },
        });
        if (!cancelled) setResolvedTeamId(teamUuid);
      } else {
        if (!cancelled) setResolvedTeamId(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [teamId, demo]);

  const hydrateAuthors = async (rows: TeamMessage[]): Promise<TeamMessage[]> => {
    const ids = Array.from(new Set(rows.map((r) => r.author_id)));
    if (ids.length === 0) return rows;
    const { data } = await supabase
      .from('profiles')
      .select('id, username, avatar_url')
      .in('id', ids);
    const map = new Map((data ?? []).map((p: any) => [p.id, p]));
    return rows.map((r) => ({ ...r, author: map.get(r.author_id) }));
  };

  useEffect(() => {
    if (!resolvedTeamId) {
      setLoading(false);
      return;
    }
    let active = true;

    const load = async () => {
      const { data, error } = await supabase
        .from('team_messages')
        .select('id, team_id, author_id, content, created_at')
        .eq('team_id', resolvedTeamId)
        .order('created_at', { ascending: true })
        .limit(200);
      if (error) {
        toast({ title: 'Failed to load messages', description: error.message, variant: 'destructive' });
        setLoading(false);
        return;
      }
      const hydrated = await hydrateAuthors((data ?? []) as TeamMessage[]);
      if (!active) return;
      setMessages(hydrated);
      setLoading(false);
      scrollToBottom();
    };
    load();

    const channel = supabase
      .channel(`team_messages:${resolvedTeamId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'team_messages', filter: `team_id=eq.${resolvedTeamId}` },
        async (payload) => {
          const row = payload.new as TeamMessage;
          const [hydrated] = await hydrateAuthors([row]);
          setMessages((prev) => (prev.some((m) => m.id === hydrated.id) ? prev : [...prev, hydrated]));
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [resolvedTeamId, toast]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = text.trim();
    if (!content) return;
    if (!user) {
      toast({ title: 'Sign in required', description: 'Please sign in to post.' });
      navigate('/login');
      return;
    }
    if (!resolvedTeamId) {
      toast({ title: 'Team unavailable', description: 'Please try again in a moment.' });
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase
        .from('team_messages')
        .insert({ team_id: resolvedTeamId, author_id: user.id, content });
      if (error) throw error;
      setText('');

      // Trigger AI auto-reply for demo teams (the "owner" responds on the wall).
      if (demo) {
        const ownerUuid = await demoIdToUuid('owner', teamId);
        supabase.functions.invoke('demo-team-reply', {
          body: {
            mode: 'team',
            demoTeamId: teamId,
            demoTeamName: demo.name,
            demoTeamGame: demo.primaryGame,
            demoOwnerName: demo.ownerName,
            ownerUuid,
            teamUuid: resolvedTeamId,
            userMessage: content,
            userName: user.email?.split('@')[0],
          },
        });
      }
    } catch (err: any) {
      toast({ title: 'Failed to send', description: err.message, variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  if (!resolvedTeamId && !loading) {
    return (
      <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6 text-center text-esports-muted">
        Team chat is unavailable for this team.
      </div>
    );
  }

  return (
    <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-4 sm:p-6 flex flex-col h-[60vh] min-h-[400px]">
      <h2 className="text-xl font-display font-semibold mb-4 text-white">Team Chat</h2>

      <div ref={scrollRef} className="flex-1 overflow-y-auto pr-2 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-esports-accent1" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-esports-muted py-12">No messages yet. Be the first to post!</div>
        ) : (
          messages.map((m) => {
            const mine = user?.id === m.author_id;
            const name = m.author?.username || 'Player';
            return (
              <div key={m.id} className={`flex gap-3 ${mine ? 'flex-row-reverse' : ''}`}>
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-esports-accent1/20 text-white text-xs">
                    {name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className={`max-w-[75%] ${mine ? 'text-right' : ''}`}>
                  <div className="text-xs text-esports-muted mb-1">
                    {name} · {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div
                    className={`inline-block px-3 py-2 rounded-lg text-sm whitespace-pre-wrap break-words ${
                      mine
                        ? 'bg-esports-accent1 text-white'
                        : 'bg-esports-background border border-esports-accent1/10 text-esports-text'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend(e as any);
            }
          }}
          placeholder={user ? 'Write a message…' : 'Sign in to chat'}
          className="min-h-[44px] max-h-32 bg-esports-background border-esports-accent1/20 text-esports-text resize-none"
          maxLength={2000}
          disabled={sending || !user}
        />
        <Button
          type="submit"
          disabled={sending || !text.trim() || !user}
          className="bg-esports-accent1 hover:bg-esports-accent1/90 text-white self-end"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
};

export default TeamChat;
