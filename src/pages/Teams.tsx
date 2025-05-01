
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TeamCard, { TeamProps } from '@/components/TeamCard';

// Sample teams data (would come from an API in a real app)
const teamsData: TeamProps[] = [
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
    name: 'Phantom Forces',
    logo: 'https://i.pravatar.cc/150?img=12',
    members: 5,
    primaryGame: 'Counter-Strike 2',
    wins: 28
  },
  {
    id: '3',
    name: 'Cyber Dragons',
    logo: 'https://i.pravatar.cc/150?img=13',
    members: 5,
    primaryGame: 'League of Legends',
    wins: 24
  },
  {
    id: '4',
    name: 'Digital Titans',
    logo: 'https://i.pravatar.cc/150?img=14',
    members: 5,
    primaryGame: 'Dota 2',
    wins: 22
  },
  {
    id: '5',
    name: 'Shadow Wolves',
    logo: 'https://i.pravatar.cc/150?img=15',
    members: 4,
    primaryGame: 'Valorant',
    wins: 18
  },
  {
    id: '6',
    name: 'Nova Raptors',
    logo: 'https://i.pravatar.cc/150?img=16',
    members: 6,
    primaryGame: 'Overwatch 2',
    wins: 16
  },
  {
    id: '7',
    name: 'Thunder Warriors',
    logo: 'https://i.pravatar.cc/150?img=17',
    members: 4,
    primaryGame: 'Fortnite',
    wins: 15
  },
  {
    id: '8',
    name: 'Inferno Squad',
    logo: 'https://i.pravatar.cc/150?img=18',
    members: 5,
    primaryGame: 'Counter-Strike 2',
    wins: 14
  },
  {
    id: '9',
    name: 'Eclipse Esports',
    logo: 'https://i.pravatar.cc/150?img=19',
    members: 5,
    primaryGame: 'League of Legends',
    wins: 12
  },
  {
    id: '10',
    name: 'Phoenix Flames',
    logo: 'https://i.pravatar.cc/150?img=20',
    members: 6,
    primaryGame: 'Rocket League',
    wins: 10
  },
  {
    id: '11',
    name: 'Quantum Raiders',
    logo: 'https://i.pravatar.cc/150?img=21',
    members: 5,
    primaryGame: 'Rainbow Six Siege',
    wins: 9
  },
  {
    id: '12',
    name: 'Stealth Vipers',
    logo: 'https://i.pravatar.cc/150?img=22',
    members: 4,
    primaryGame: 'Call of Duty: Modern Warfare',
    wins: 8
  }
];

const TeamsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');

  // Get unique game names for filter dropdown
  const games = ['all', ...Array.from(new Set(teamsData.map(t => t.primaryGame)))];

  // Filter teams based on search term and selected game
  const filteredTeams = teamsData.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = selectedGame === 'all' || team.primaryGame === selectedGame;
    
    return matchesSearch && matchesGame;
  });

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-8 text-white">Teams</h1>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
            <Input 
              type="text" 
              placeholder="Search teams..." 
              className="pl-10 bg-esports-card border-esports-accent1/20 text-esports-text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={selectedGame} onValueChange={setSelectedGame}>
              <SelectTrigger className="bg-esports-card border-esports-accent1/20 text-esports-text">
                <SelectValue placeholder="Filter by Game" />
              </SelectTrigger>
              <SelectContent className="bg-esports-card border-esports-accent1/20">
                {games.map(game => (
                  <SelectItem key={game} value={game} className="capitalize">
                    {game === 'all' ? 'All Games' : game}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Teams Grid */}
        {filteredTeams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTeams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-esports-muted">
            No teams found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
