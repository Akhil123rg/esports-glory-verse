
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Users, Trophy, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeamCard, { TeamProps } from '@/components/TeamCard';

const TournamentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // This would come from an API in a real application
  const tournament = {
    id: id || '1',
    title: 'Valorant Champions Tour 2025',
    game: 'Valorant',
    gameImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
    startDate: 'May 15, 2025',
    endDate: 'June 20, 2025',
    prizePool: '$500,000',
    participants: 16,
    status: 'upcoming',
    description: 'The Valorant Champions Tour (VCT) is the highest level of professional competition for Valorant. Join the competition to battle against the best teams in the world, with a massive prize pool and global recognition at stake.',
    location: 'Online & LAN Finals in Los Angeles, CA',
    format: 'Group Stage followed by Single Elimination Bracket',
    organizer: 'GloryVerse eSports',
    rules: 'Standard competitive ruleset. Teams must have a minimum of 5 registered players.',
    schedule: [
      { phase: 'Registration Deadline', date: 'April 30, 2025' },
      { phase: 'Group Stage', date: 'May 15-30, 2025' },
      { phase: 'Playoffs', date: 'June 5-15, 2025' },
      { phase: 'Grand Finals', date: 'June 20, 2025' }
    ]
  };

  // Sample teams data
  const teams: TeamProps[] = [
    {
      id: '1',
      name: 'Neon Vipers',
      logo: 'https://i.pravatar.cc/150?img=11',
      members: 6,
      primaryGame: 'Valorant',
      wins: 32
    },
    {
      id: '2',
      name: 'Shadow Wolves',
      logo: 'https://i.pravatar.cc/150?img=15',
      members: 4,
      primaryGame: 'Valorant',
      wins: 18
    },
    {
      id: '5',
      name: 'Quantum Raiders',
      logo: 'https://i.pravatar.cc/150?img=21',
      members: 5,
      primaryGame: 'Valorant',
      wins: 9
    },
    {
      id: '6',
      name: 'Stealth Vipers',
      logo: 'https://i.pravatar.cc/150?img=22',
      members: 4,
      primaryGame: 'Valorant',
      wins: 8
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8">
          <img
            src={tournament.gameImage}
            alt={tournament.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-esports-background via-esports-background/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-white">
              {tournament.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-esports-muted">
                <Gamepad size={16} className="text-esports-accent2" />
                <span>{tournament.game}</span>
              </div>
              <div className="flex items-center gap-2 text-esports-muted">
                <Calendar size={16} className="text-esports-accent1" />
                <span>{tournament.startDate} - {tournament.endDate}</span>
              </div>
              <div className="flex items-center gap-2 text-esports-muted">
                <Trophy size={16} className="text-esports-accent3" />
                <span>Prize Pool: {tournament.prizePool}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button className="bg-esports-accent1 hover:bg-esports-accent1/90 text-white">
            Register Team
          </Button>
          <Button variant="outline" className="border-esports-accent1 text-esports-accent1 hover:bg-esports-accent1 hover:text-white">
            Follow Tournament
          </Button>
        </div>

        {/* Tournament Details Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-esports-card border border-esports-accent1/20 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-display font-semibold mb-4 text-white">About This Tournament</h2>
                  <p className="text-esports-muted mb-6">{tournament.description}</p>
                  
                  <h3 className="text-lg font-display font-semibold mb-2 text-white">Format</h3>
                  <p className="text-esports-muted mb-6">{tournament.format}</p>
                  
                  <h3 className="text-lg font-display font-semibold mb-2 text-white">Prizes</h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <span className="text-white">$250,000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <span className="text-white">$120,000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <span className="text-white">$80,000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-esports-card border border-esports-accent1/20 rounded-full flex items-center justify-center text-white font-bold">4</div>
                      <span className="text-white">$50,000</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-display font-semibold mb-4 text-white">Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar size={20} className="text-esports-accent1 mt-1" />
                      <div>
                        <p className="text-sm text-esports-muted">Dates</p>
                        <p className="text-white">{tournament.startDate} - {tournament.endDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-esports-accent2 mt-1" />
                      <div>
                        <p className="text-sm text-esports-muted">Location</p>
                        <p className="text-white">{tournament.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users size={20} className="text-esports-accent3 mt-1" />
                      <div>
                        <p className="text-sm text-esports-muted">Participants</p>
                        <p className="text-white">{tournament.participants} Teams</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Trophy size={20} className="text-esports-accent1 mt-1" />
                      <div>
                        <p className="text-sm text-esports-muted">Prize Pool</p>
                        <p className="text-white">{tournament.prizePool}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
                  <h2 className="text-xl font-display font-semibold mb-4 text-white">Organizer</h2>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-esports-accent1/20 rounded-full flex items-center justify-center">
                      <Trophy size={24} className="text-esports-accent1" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{tournament.organizer}</p>
                      <p className="text-xs text-esports-muted">Official Tournament Organizer</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-esports-accent1 text-esports-accent1 hover:bg-esports-accent1 hover:text-white">
                    Contact Organizer
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="teams">
            <h2 className="text-xl font-display font-semibold mb-4 text-white">Registered Teams</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teams.map(team => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
              <h2 className="text-xl font-display font-semibold mb-6 text-white">Tournament Schedule</h2>
              <div className="space-y-6">
                {tournament.schedule.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 mt-2 bg-esports-accent1 rounded-full"></div>
                    <div className="ml-6 pb-6 border-l border-esports-accent1/20 pl-6">
                      <h3 className="text-lg font-display font-semibold text-white">{item.phase}</h3>
                      <div className="flex items-center mt-1 text-esports-muted">
                        <Clock size={16} className="mr-2" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rules">
            <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
              <h2 className="text-xl font-display font-semibold mb-6 text-white">Tournament Rules</h2>
              <p className="text-esports-muted mb-4">{tournament.rules}</p>
              <h3 className="text-lg font-display font-semibold mb-2 text-white">General Rules</h3>
              <ul className="list-disc pl-5 text-esports-muted space-y-2 mb-4">
                <li>All participants must be registered on GloryVerse</li>
                <li>Players must be at least 16 years of age</li>
                <li>Teams must have a minimum of 5 and maximum of 7 players (5 starters, 2 substitutes)</li>
                <li>All matches will be played on the latest game version</li>
                <li>Tournament admins have the final decision in all disputes</li>
              </ul>
              
              <h3 className="text-lg font-display font-semibold mb-2 text-white">Match Rules</h3>
              <ul className="list-disc pl-5 text-esports-muted space-y-2 mb-4">
                <li>Best-of-3 format for all matches</li>
                <li>Maps are selected through a veto system</li>
                <li>Standard competitive game settings</li>
                <li>15 minute grace period for match start times</li>
                <li>Teams must record POV demos for all matches</li>
              </ul>
              
              <h3 className="text-lg font-display font-semibold mb-2 text-white">Code of Conduct</h3>
              <ul className="list-disc pl-5 text-esports-muted space-y-2">
                <li>Zero tolerance for toxic behavior, racism, or harassment</li>
                <li>No cheating or use of unauthorized software</li>
                <li>Be respectful to all participants, staff, and viewers</li>
                <li>Report any suspicious behavior to tournament admins</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentDetailsPage;
