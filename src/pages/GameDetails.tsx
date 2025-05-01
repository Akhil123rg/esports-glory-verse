
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Users, Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TournamentCard, { TournamentProps } from '@/components/TournamentCard';

const GameDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // This would come from an API in a real application
  const games = {
    "1": {
      id: "1",
      name: 'Valorant',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800',
      tournaments: 24,
      players: 15800,
      popularityRank: 1,
      description: 'Valorant is a free-to-play first-person hero shooter developed and published by Riot Games. The game operates on an economy-round, objective-based, first-to-13 competitive format where players select unique agents, each bringing a set of distinctive abilities.',
      platforms: ['PC'],
      developer: 'Riot Games',
      releaseDate: 'June 2, 2020',
      genre: 'Tactical First-Person Shooter'
    },
    "2": {
      id: "2", 
      name: 'Counter-Strike 2',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800',
      tournaments: 32,
      players: 24600,
      popularityRank: 2,
      description: 'Counter-Strike 2 is a competitive tactical first-person shooter and the latest iteration in Valve\'s Counter-Strike series. The game pits two teams against each other: the Terrorists and the Counter-Terrorists, featuring multiple game modes with distinct objectives.',
      platforms: ['PC'],
      developer: 'Valve Corporation',
      releaseDate: 'September 27, 2023',
      genre: 'Tactical First-Person Shooter'
    },
    "3": {
      id: "3",
      name: 'League of Legends',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800',
      tournaments: 18,
      players: 32400,
      popularityRank: 3,
      description: "League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.",
      platforms: ['PC'],
      developer: 'Riot Games',
      releaseDate: 'October 27, 2009',
      genre: 'MOBA'
    }
  };

  // Get the current game or default to the first one if ID not found
  const game = games[id as keyof typeof games] || games["1"];

  // Sample tournaments data based on the current game
  const tournaments: TournamentProps[] = [
    {
      id: '1',
      title: `${game.name} Champions Tour 2025`,
      game: game.name,
      gameImage: game.image,
      startDate: 'May 15, 2025',
      endDate: 'June 20, 2025',
      prizePool: '$500,000',
      participants: 128,
      status: 'upcoming'
    },
    {
      id: '2',
      title: `${game.name} Pro League Season 3`,
      game: game.name,
      gameImage: game.image,
      startDate: 'June 5, 2025',
      endDate: 'July 30, 2025',
      prizePool: '$250,000',
      participants: 64,
      status: 'upcoming'
    },
    {
      id: '3',
      title: `${game.name} Regional Clash`,
      game: game.name,
      gameImage: game.image,
      startDate: 'Mar 1, 2025',
      endDate: 'Mar 25, 2025',
      prizePool: '$50,000',
      participants: 32,
      status: 'ongoing'
    }
  ];

  // Stats and leaderboard data
  const topPlayers = [
    { id: '1', username: 'ProSniper', kills: 1258, wins: 42, rank: 1 },
    { id: '2', username: 'AimGod', kills: 1120, wins: 29, rank: 5 },
    { id: '3', username: 'FlickMaster', kills: 950, wins: 26, rank: 6 }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8">
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-esports-background via-esports-background/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-white">
              {game.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-esports-muted">
                <Calendar size={16} className="text-esports-accent1" />
                <span>{game.tournaments} Active Tournaments</span>
              </div>
              <div className="flex items-center gap-2 text-esports-muted">
                <Users size={16} className="text-esports-accent2" />
                <span>{game.players.toLocaleString()} Registered Players</span>
              </div>
            </div>
          </div>
        </div>

        {/* Game Details Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-esports-card border border-esports-accent1/20 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-display font-semibold mb-4 text-white">About {game.name}</h2>
                  <p className="text-esports-muted mb-6">{game.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm uppercase text-esports-muted">Developer</h3>
                      <p className="text-white">{game.developer}</p>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase text-esports-muted">Release Date</h3>
                      <p className="text-white">{game.releaseDate}</p>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase text-esports-muted">Genre</h3>
                      <p className="text-white">{game.genre}</p>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase text-esports-muted">Platforms</h3>
                      <p className="text-white">{game.platforms.join(', ')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-display font-semibold text-white">Featured Tournaments</h2>
                    <Link to="/tournaments" className="flex items-center group text-esports-accent1 hover:text-esports-accent1/80">
                      <span>View All</span>
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {tournaments.slice(0, 2).map(tournament => (
                      <TournamentCard key={tournament.id} tournament={tournament} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-display font-semibold mb-4 text-white">Top Players</h2>
                  <div className="space-y-4">
                    {topPlayers.map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-esports-accent1/20 flex items-center justify-center text-esports-accent1">
                            {player.rank}
                          </div>
                          <div>
                            <p className="font-medium text-white">{player.username}</p>
                            <div className="flex items-center gap-2 text-xs text-esports-muted">
                              <Trophy size={10} className="text-esports-accent2" />
                              <span>{player.wins} Wins</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-semibold">{player.kills}</div>
                          <div className="text-xs text-esports-muted">Kills</div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-esports-accent1 text-esports-accent1 hover:bg-esports-accent1 hover:text-white mt-2">
                      View Full Leaderboard
                    </Button>
                  </div>
                </div>
                
                <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
                  <h2 className="text-xl font-display font-semibold mb-4 text-white">Game Stats</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-esports-muted">Active Players</span>
                      <span className="text-white font-medium">{game.players.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-esports-muted">Active Tournaments</span>
                      <span className="text-white font-medium">{game.tournaments}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-esports-muted">Total Prize Money</span>
                      <span className="text-white font-medium">$3,450,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-esports-muted">Popularity Rank</span>
                      <span className="text-white font-medium">#{game.popularityRank}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tournaments">
            <h2 className="text-xl font-display font-semibold mb-6 text-white">{game.name} Tournaments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments.map(tournament => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="leaderboards">
            <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-6">
              <h2 className="text-xl font-display font-semibold mb-6 text-white">{game.name} Leaderboards</h2>
              <p className="text-esports-muted mb-4">Full leaderboards would be implemented here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GameDetailsPage;
