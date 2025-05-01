
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Gamepad as GamepadIcon, Calendar, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock tournament data (would come from an API in a real app)
const tournamentData = {
  id: '1',
  name: 'ESL Pro League Season 16',
  game: 'Counter-Strike 2',
  startDate: '2025-06-15',
  endDate: '2025-06-22',
  prizePool: '$250,000',
  format: 'Double Elimination',
  description: 'The ESL Pro League is a professional esports league for Counter-Strike 2. Season 16 features 24 teams competing for a $250,000 prize pool over the course of a week.',
  teams: [
    { id: '1', name: 'FaZe Clan', logo: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Natus Vincere', logo: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Team Liquid', logo: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'Vitality', logo: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'G2 Esports', logo: 'https://i.pravatar.cc/150?img=5' },
    { id: '6', name: 'Astralis', logo: 'https://i.pravatar.cc/150?img=6' },
    { id: '7', name: 'Cloud9', logo: 'https://i.pravatar.cc/150?img=7' },
    { id: '8', name: 'Fnatic', logo: 'https://i.pravatar.cc/150?img=8' }
  ],
  brackets: [
    { round: 'Quarter Finals', matches: [
      { id: 'qf1', team1: 'FaZe Clan', team2: 'Fnatic', score: '2-0', winner: 'FaZe Clan' },
      { id: 'qf2', team1: 'Natus Vincere', team2: 'Cloud9', score: '2-1', winner: 'Natus Vincere' },
      { id: 'qf3', team1: 'Team Liquid', team2: 'Astralis', score: '2-1', winner: 'Team Liquid' },
      { id: 'qf4', team1: 'Vitality', team2: 'G2 Esports', score: '2-0', winner: 'Vitality' }
    ]},
    { round: 'Semi Finals', matches: [
      { id: 'sf1', team1: 'FaZe Clan', team2: 'Natus Vincere', score: '2-1', winner: 'FaZe Clan' },
      { id: 'sf2', team1: 'Team Liquid', team2: 'Vitality', score: '1-2', winner: 'Vitality' }
    ]},
    { round: 'Finals', matches: [
      { id: 'f1', team1: 'FaZe Clan', team2: 'Vitality', score: '3-2', winner: 'FaZe Clan' }
    ]}
  ],
  rules: 'Standard ESL ruleset applies. All matches in the bracket are best-of-three, except for the finals which is best-of-five.',
  streamLink: 'https://www.twitch.tv/esl_cs'
};

const TournamentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // In a real app, you would fetch the tournament based on the ID
  const tournament = tournamentData;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/tournaments" className="text-esports-accent1 hover:underline mb-4 inline-flex items-center">
            ← Back to Tournaments
          </Link>
          <h1 className="text-4xl font-display font-bold text-white mt-2">{tournament.name}</h1>
        </div>

        {/* Tournament Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
              <h2 className="text-2xl font-display font-bold text-white mb-4">Overview</h2>
              <p className="text-esports-text mb-6">{tournament.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <GamepadIcon size={20} className="text-esports-accent1 mr-3" />
                  <div>
                    <p className="text-esports-muted text-sm">Game</p>
                    <p className="text-esports-text font-medium">{tournament.game}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar size={20} className="text-esports-accent2 mr-3" />
                  <div>
                    <p className="text-esports-muted text-sm">Date</p>
                    <p className="text-esports-text font-medium">{tournament.startDate} to {tournament.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Trophy size={20} className="text-esports-accent3 mr-3" />
                  <div>
                    <p className="text-esports-muted text-sm">Prize Pool</p>
                    <p className="text-esports-text font-medium">{tournament.prizePool}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="text-esports-accent1 mr-3" />
                  <div>
                    <p className="text-esports-muted text-sm">Format</p>
                    <p className="text-esports-text font-medium">{tournament.format}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Tournament Rules</h3>
                <p className="text-esports-text">{tournament.rules}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Live Stream</h3>
                <a 
                  href={tournament.streamLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-esports-accent1 hover:underline"
                >
                  Watch on Twitch
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-display font-bold text-white mb-4">Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-esports-accent1 hover:bg-esports-accent1/90">
                  Register Team
                </Button>
                <Button variant="outline" className="w-full border-esports-accent1 text-esports-accent1 hover:bg-esports-accent1 hover:text-white">
                  Add to Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Participating Teams */}
        <div className="mb-10">
          <h2 className="text-2xl font-display font-bold text-white mb-6">Participating Teams</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {tournament.teams.map(team => (
              <Link to={`/teams/${team.id}`} key={team.id} className="bg-esports-card border border-esports-accent1/20 rounded-lg p-4 hover:border-esports-accent1 transition-colors text-center">
                <img 
                  src={team.logo} 
                  alt={team.name} 
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-esports-accent1/30"
                />
                <p className="text-esports-text font-medium truncate">{team.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Tournament Bracket */}
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-6">Tournament Bracket</h2>
          <div className="space-y-8">
            {tournament.brackets.map((bracket, index) => (
              <div key={index} className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
                <h3 className="text-xl font-display font-bold text-white mb-4">{bracket.round}</h3>
                <div className="space-y-4">
                  {bracket.matches.map(match => (
                    <div key={match.id} className="border border-esports-accent1/30 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className={`text-lg font-medium ${match.winner === match.team1 ? 'text-esports-accent1' : 'text-esports-text'}`}>
                            {match.team1}
                          </div>
                          <div className={`text-lg font-medium mt-2 ${match.winner === match.team2 ? 'text-esports-accent1' : 'text-esports-text'}`}>
                            {match.team2}
                          </div>
                        </div>
                        <div className="text-2xl font-display font-bold text-esports-text">
                          {match.score}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailsPage;
