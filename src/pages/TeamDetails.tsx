
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Trophy, Gamepad, Award, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FollowTeamButton from '@/components/team/FollowTeamButton';
import TeamChat from '@/components/team/TeamChat';
import { supabase } from '@/integrations/supabase/client';
import { isUuid } from '@/lib/uuid';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const TeamDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [ownerId, setOwnerId] = useState<string | null>(null);

  // This would come from an API in a real application
  const team = {
    id: id || '1',
    name: 'Neon Vipers',
    logo: 'https://i.pravatar.cc/150?img=11',
    members: [
      { id: '1', username: 'ViperKing', role: 'Captain', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', username: 'StrikeX', role: 'Fragger', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: '3', username: 'PhantomAce', role: 'Support', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: '4', username: 'ShadowSniper', role: 'Entry', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: '5', username: 'BlitzStorm', role: 'IGL', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: '6', username: 'VenomByte', role: 'Coach', avatar: 'https://i.pravatar.cc/150?img=6' }
    ],
    primaryGame: 'Valorant',
    wins: 32,
    losses: 14,
    tournamentWins: 5,
    currentTournaments: 2,
    description: 'Neon Vipers is a professional Valorant team known for their aggressive playstyle and strategic executions. Founded in 2022, the team has quickly risen through the ranks to become one of the top contenders in professional Valorant tournaments.',
    achievements: [
      { title: 'Valorant Champions Tour 2024 - 2nd Place', date: 'June 2024' },
      { title: 'Regional Masters 2024 - 1st Place', date: 'April 2024' },
      { title: 'Winter Championship - 1st Place', date: 'January 2024' },
      { title: 'Summer Invitational - 3rd Place', date: 'August 2023' },
      { title: 'Spring Open - 1st Place', date: 'March 2023' }
    ],
    upcomingMatches: [
      { tournament: 'Valorant Champions Tour 2025', opponent: 'Phantom Forces', date: 'May 20, 2025' },
      { tournament: 'Regional Clash Season 2', opponent: 'Shadow Wolves', date: 'June 5, 2025' }
    ],
    joinedDate: 'March 2022',
    country: 'United States'
  };

  useEffect(() => {
    if (!id || !isUuid(id)) return;
    supabase
      .from('teams')
      .select('owner_id')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => setOwnerId(data?.owner_id ?? null));
  }, [id]);

  const handleMessageOwner = async () => {
    if (!user) {
      toast({ title: 'Sign in required', description: 'Please sign in to send messages.' });
      return;
    }
    if (!ownerId) {
      toast({ title: 'Demo team', description: 'No owner to message on this sample team.' });
      return;
    }
    if (ownerId === user.id) {
      toast({ title: "That's you!", description: 'You own this team.' });
      return;
    }
    const { error } = await supabase
      .from('direct_messages')
      .insert({ sender_id: user.id, recipient_id: ownerId, content: `Hi! I'd like to chat about ${team.name}.` });
    if (error) {
      toast({ title: 'Message failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Message sent', description: 'Open the chat icon to continue the conversation.' });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Team Header */}
        <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-esports-accent2">
              <AvatarImage src={team.logo} alt={team.name} />
              <AvatarFallback className="bg-esports-accent2 text-white text-xl font-display">
                {getInitials(team.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-display font-bold mb-2 text-white">{team.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center gap-2 text-esports-muted">
                  <Gamepad size={16} className="text-esports-accent1" />
                  <span>{team.primaryGame}</span>
                </div>
                <div className="flex items-center gap-2 text-esports-muted">
                  <Users size={16} className="text-esports-accent2" />
                  <span>{team.members.length} Members</span>
                </div>
                <div className="flex items-center gap-2 text-esports-muted">
                  <Trophy size={16} className="text-esports-accent3" />
                  <span>{team.tournamentWins} Tournament Wins</span>
                </div>
              </div>
              <p className="text-esports-muted mb-4 max-w-2xl">{team.description}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <FollowTeamButton teamId={team.id} />
                <Button
                  variant="outline"
                  onClick={handleMessageOwner}
                  className="border-esports-accent1 text-esports-accent1 hover:bg-esports-accent1 hover:text-white"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Owner
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Team Details Tabs */}
        <Tabs defaultValue="roster" className="w-full">
          <TabsList className="bg-esports-card border border-esports-accent1/20 mb-6">
            <TabsTrigger value="roster">Roster</TabsTrigger>
            <TabsTrigger value="chat">Team Chat</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <TeamChat teamId={team.id} />
          </TabsContent>
          
          <TabsContent value="roster">
            <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
              <h2 className="text-xl font-display font-semibold mb-6 text-white">Team Roster</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.members.map(member => (
                  <div key={member.id} className="bg-esports-background border border-esports-accent1/10 rounded-lg p-4 flex items-center">
                    <Avatar className="h-16 w-16 mr-4 border-2 border-esports-accent1/30">
                      <AvatarImage src={member.avatar} alt={member.username} />
                      <AvatarFallback className="bg-esports-accent1/20 text-white">
                        {member.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-display font-semibold text-white mb-1">{member.username}</h3>
                      <p className="text-sm text-esports-muted">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
              <h2 className="text-xl font-display font-semibold mb-6 text-white">Team Achievements</h2>
              <div className="space-y-6">
                {team.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-esports-accent1/20 flex items-center justify-center mr-4">
                      <Trophy size={24} className="text-esports-accent1" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white">{achievement.title}</h3>
                      <p className="text-sm text-esports-muted">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
              <h2 className="text-xl font-display font-semibold mb-6 text-white">Upcoming Matches</h2>
              {team.upcomingMatches.length > 0 ? (
                <div className="space-y-4">
                  {team.upcomingMatches.map((match, index) => (
                    <div key={index} className="bg-esports-background border border-esports-accent1/10 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-display font-semibold text-white mb-1">{match.tournament}</h3>
                          <p className="text-sm text-esports-muted">vs {match.opponent}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-esports-accent1 font-semibold">{match.date}</p>
                          <Button variant="outline" size="sm" className="mt-2 border-esports-accent1 text-esports-accent1 hover:bg-esports-accent1 hover:text-white">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-esports-muted">No upcoming matches scheduled.</p>
              )}
              
              <h2 className="text-xl font-display font-semibold mb-6 mt-8 text-white">Past Results</h2>
              <p className="text-esports-muted">Match history would be displayed here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
                <h2 className="text-xl font-display font-semibold mb-6 text-white">Team Statistics</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-white">{team.wins}</div>
                    <p className="text-esports-muted">Wins</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-white">{team.losses}</div>
                    <p className="text-esports-muted">Losses</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-white">
                      {Math.round(team.wins / (team.wins + team.losses) * 100)}%
                    </div>
                    <p className="text-esports-muted">Win Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-white">{team.tournamentWins}</div>
                    <p className="text-esports-muted">Tournament Wins</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
                <h2 className="text-xl font-display font-semibold mb-6 text-white">Team Awards</h2>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award size={30} className="text-yellow-500" />
                    </div>
                    <p className="text-sm text-white">Gold</p>
                    <p className="text-xl font-display font-bold text-white">5</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award size={30} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-white">Silver</p>
                    <p className="text-xl font-display font-bold text-white">3</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-700/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award size={30} className="text-amber-700" />
                    </div>
                    <p className="text-sm text-white">Bronze</p>
                    <p className="text-xl font-display font-bold text-white">2</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
