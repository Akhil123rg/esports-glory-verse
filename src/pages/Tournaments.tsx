
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TournamentCard, { TournamentProps } from '@/components/TournamentCard';

// Sample tournament data (would come from an API in a real app)
const tournamentsData: TournamentProps[] = [
  {
    id: '1',
    title: 'Valorant Champions Tour 2025',
    game: 'Valorant',
    gameImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
    startDate: 'May 15, 2025',
    endDate: 'June 20, 2025',
    prizePool: '$500,000',
    participants: 128,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'League of Legends World Championship',
    game: 'League of Legends',
    gameImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800',
    startDate: 'Sep 10, 2025',
    endDate: 'Oct 30, 2025',
    prizePool: '$2,000,000',
    participants: 24,
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'CS:GO Pro League Season 20',
    game: 'Counter-Strike: Global Offensive',
    gameImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800',
    startDate: 'Mar 1, 2025',
    endDate: 'Mar 25, 2025',
    prizePool: '$1,000,000',
    participants: 32,
    status: 'ongoing'
  },
  {
    id: '4',
    title: 'Dota 2 International',
    game: 'Dota 2',
    gameImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800',
    startDate: 'Oct 5, 2025',
    endDate: 'Oct 25, 2025',
    prizePool: '$30,000,000',
    participants: 18,
    status: 'upcoming'
  },
  {
    id: '5',
    title: 'Fortnite World Cup',
    game: 'Fortnite',
    gameImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
    startDate: 'July 12, 2025',
    endDate: 'July 28, 2025',
    prizePool: '$3,000,000',
    participants: 200,
    status: 'upcoming'
  },
  {
    id: '6',
    title: 'Rocket League Championship Series',
    game: 'Rocket League',
    gameImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800',
    startDate: 'Apr 2, 2025',
    endDate: 'June 5, 2025',
    prizePool: '$1,200,000',
    participants: 32,
    status: 'ongoing'
  },
  {
    id: '7',
    title: 'Overwatch League Grand Finals',
    game: 'Overwatch',
    gameImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800',
    startDate: 'Nov 10, 2025',
    endDate: 'Nov 15, 2025',
    prizePool: '$1,500,000',
    participants: 12,
    status: 'upcoming'
  },
  {
    id: '8',
    title: 'Rainbow Six Invitational',
    game: 'Rainbow Six Siege',
    gameImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
    startDate: 'Feb 5, 2025',
    endDate: 'Feb 17, 2025',
    prizePool: '$3,000,000',
    participants: 16,
    status: 'completed'
  },
  {
    id: '9',
    title: 'Call of Duty League Championship',
    game: 'Call of Duty: Modern Warfare',
    gameImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800',
    startDate: 'Aug 8, 2025',
    endDate: 'Aug 15, 2025',
    prizePool: '$2,500,000',
    participants: 12,
    status: 'upcoming'
  }
];

const TournamentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Filter and sort tournaments based on user selections
  const filteredTournaments = tournamentsData.filter(tournament => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           tournament.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = selectedGame === 'all' || tournament.game.toLowerCase() === selectedGame.toLowerCase();
    
    return matchesSearch && matchesGame;
  }).sort((a, b) => {
    if (sortBy === 'prize') {
      return parseInt(b.prizePool.replace(/[^0-9]/g, '')) - parseInt(a.prizePool.replace(/[^0-9]/g, ''));
    } else if (sortBy === 'participants') {
      return b.participants - a.participants;
    } else {
      // Default: sort by date
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }
  });

  // Get unique game names for filter dropdown
  const games = ['all', ...Array.from(new Set(tournamentsData.map(t => t.game)))];

  // Filter tournaments by status
  const upcomingTournaments = filteredTournaments.filter(t => t.status === 'upcoming');
  const ongoingTournaments = filteredTournaments.filter(t => t.status === 'ongoing');
  const completedTournaments = filteredTournaments.filter(t => t.status === 'completed');

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-8 text-white">Tournaments</h1>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
            <Input 
              type="text" 
              placeholder="Search tournaments..." 
              className="pl-10 bg-esports-card border-esports-accent1/20 text-esports-text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="w-full sm:w-48">
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger className="bg-esports-card border-esports-accent1/20 text-esports-text">
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-esports-accent1" />
                    <SelectValue placeholder="Filter by Game" />
                  </div>
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
            <div className="w-full sm:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-esports-card border-esports-accent1/20 text-esports-text">
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-esports-accent2" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-esports-card border-esports-accent1/20">
                  <SelectItem value="date">Date (Soonest)</SelectItem>
                  <SelectItem value="prize">Prize Pool</SelectItem>
                  <SelectItem value="participants">Participants</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs for tournament status */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-8 bg-esports-card border border-esports-accent1/20">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-esports-accent1 data-[state=active]:text-white">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="data-[state=active]:bg-esports-accent2 data-[state=active]:text-white">
              Ongoing
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-esports-accent3 data-[state=active]:text-white">
              Completed
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-esports-card data-[state=active]:text-white">
              All
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingTournaments.map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-esports-muted">
                No upcoming tournaments match your filters.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ongoing">
            {ongoingTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ongoingTournaments.map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-esports-muted">
                No ongoing tournaments match your filters.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedTournaments.map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-esports-muted">
                No completed tournaments match your filters.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all">
            {filteredTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTournaments.map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-esports-muted">
                No tournaments match your filters.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentsPage;
