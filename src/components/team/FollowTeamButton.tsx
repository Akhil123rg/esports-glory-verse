import React, { useEffect, useState } from 'react';
import { Heart, HeartOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { isUuid } from '@/lib/uuid';
import { demoIdToUuid, getDemoTeam, isDemoTeam } from '@/lib/demoTeams';

interface FollowTeamButtonProps {
  teamId: string;
  onChange?: (followerCount: number, isFollowing: boolean) => void;
}

const FollowTeamButton: React.FC<FollowTeamButtonProps> = ({ teamId, onChange }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [resolvedTeamId, setResolvedTeamId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isUuid(teamId)) {
        if (!cancelled) setResolvedTeamId(teamId);
        return;
      }
      if (isDemoTeam(teamId)) {
        const teamUuid = await demoIdToUuid('team', teamId);
        const ownerUuid = await demoIdToUuid('owner', teamId);
        const info = getDemoTeam(teamId)!;
        // Make sure the demo team & owner profile exist before we try to follow.
        await supabase.functions.invoke('demo-team-reply', {
          body: {
            mode: 'ensure',
            demoTeamId: teamId,
            demoTeamName: info.name,
            demoTeamGame: info.primaryGame,
            demoOwnerName: info.ownerName,
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
  }, [teamId]);

  useEffect(() => {
    if (!resolvedTeamId) {
      setLoading(false);
      return;
    }
    let active = true;

    const load = async () => {
      const [{ count: total }, mine] = await Promise.all([
        supabase
          .from('team_followers')
          .select('id', { count: 'exact', head: true })
          .eq('team_id', resolvedTeamId),
        user
          ? supabase
              .from('team_followers')
              .select('id')
              .eq('team_id', resolvedTeamId)
              .eq('user_id', user.id)
              .maybeSingle()
          : Promise.resolve({ data: null, error: null } as any),
      ]);

      if (!active) return;
      setCount(total ?? 0);
      setFollowing(!!mine.data);
      setLoading(false);
    };

    load();

    const channel = supabase
      .channel(`team_followers:${resolvedTeamId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'team_followers', filter: `team_id=eq.${resolvedTeamId}` },
        () => load()
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [resolvedTeamId, user]);

  const toggle = async () => {
    if (!user) {
      toast({ title: 'Sign in required', description: 'Please sign in to follow teams.' });
      navigate('/login');
      return;
    }
    if (!resolvedTeamId) {
      toast({ title: 'Team unavailable', description: 'Please try again in a moment.' });
      return;
    }

    setBusy(true);
    try {
      if (following) {
        const { error } = await supabase
          .from('team_followers')
          .delete()
          .eq('team_id', resolvedTeamId)
          .eq('user_id', user.id);
        if (error) throw error;
        onChange?.(Math.max(0, count - 1), false);
      } else {
        const { error } = await supabase
          .from('team_followers')
          .insert({ team_id: resolvedTeamId, user_id: user.id });
        if (error) throw error;
        onChange?.(count + 1, true);
      }
    } catch (e: any) {
      toast({ title: 'Action failed', description: e.message, variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      onClick={toggle}
      disabled={busy || loading}
      className={
        following
          ? 'bg-esports-card border border-esports-accent1 text-esports-accent1 hover:bg-esports-accent1/10'
          : 'bg-esports-accent1 hover:bg-esports-accent1/90 text-white'
      }
    >
      {busy ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : following ? (
        <HeartOff className="mr-2 h-4 w-4" />
      ) : (
        <Heart className="mr-2 h-4 w-4" />
      )}
      {following ? 'Following' : 'Follow Team'}
      {!loading && <span className="ml-2 opacity-70">· {count}</span>}
    </Button>
  );
};

export default FollowTeamButton;
