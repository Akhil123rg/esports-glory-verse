
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LeaderboardRow, { PlayerProps } from '@/components/LeaderboardRow';

// Sample players data (would come from an API in a real app)
const playersData: PlayerProps[] = [
  {
    id: '1',
    rank: 1,
    username: 'ProSniper',
    avatar: 'https://i.pravatar.cc/150?img=1',
    game: 'Valorant',
    wins: 42,
    kills: 1258,
    points: 9850
  },
  {
    id: '2',
    rank: 2,
    username: 'LegendX',
    avatar: 'https://i.pravatar.cc/150?img=2',
    game: 'League of Legends',
    wins: 38,
    kills: 980,
    points: 9340
  },
  {
    id: '3',
    rank: 3,
    username: 'HeadshotKing',
    avatar: 'https://i.pravatar.cc/150?img=3',
    game: 'Counter-Strike 2',
    wins: 35,
    kills: 1430,
    points: 9120
  },
  {
    id: '4',
    rank: 4,
    username: 'StratMaster',
    avatar: 'https://i.pravatar.cc/150?img=4',
    game: 'Dota 2',
    wins: 32,
    kills: 860,
    points: 8760
  },
  {
    id: '5',
    rank: 5,
    username: 'AimGod',
    avatar: 'https://i.pravatar.cc/150?img=5',
    game: 'Fortnite',
    wins: 29,
    kills: 1120,
    points: 8450
  },
  {
    id: '6',
    rank: 6,
    username: 'FlickMaster',
    avatar: 'https://i.pravatar.cc/150?img=6',
    game: 'Valorant',
    wins: 26,
    kills: 950,
    points: 8120
  },
  {
    id: '7',
    rank: 7,
    username: 'QuickScope',
    avatar: 'https://i.pravatar.cc/150?img=7',
    game: 'Counter-Strike 2',
    wins: 24,
    kills: 1050,
    points: 7890
  },
  {
    id: '8',
    rank: 8,
    username: 'MidLaner',
    avatar: 'https://i.pravatar.cc/150?img=8',
    game: 'League of Legends',
    wins: 23,
    kills: 780,
    points: 7640
  },
  {
    id: '9',
    rank: 9,
    username: 'JungleKing',
    avatar: 'https://i.pravatar.cc/150?img=9',
    game: 'League of Legends',
    wins: 21,
    kills: 720,
    points: 7320
  },
  {
    id: '10',
    rank: 10,
    username: 'RocketMan',
    avatar: 'https://i.pravatar.cc/150?img=10',
    game: 'Rocket League',
    wins: 19,
    kills: 0,
    points: 7080
  }
];

const LeaderboardsPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState('all');

  // Get unique game names for filter dropdown
  const games = ['all', ...Array.from(new Set(playersData.map(p => p.game)))];

  // Filter players based on selected game
  const filteredPlayers = playersData
    .filter(player => selectedGame === 'all' || player.game === selectedGame)
    .map((player, index) => ({ ...player, rank: index + 1 }));

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-8 text-white">Leaderboards</h1>

        {/* Game Filter */}
        <div className="mb-8 max-w-xs">
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

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="points" className="w-full">
          <TabsList className="mb-8 bg-esports-card border border-esports-accent1/20">
            <TabsTrigger value="points" className="data-[state=active]:bg-esports-accent1 data-[state=active]:text-white">
              Points
            </TabsTrigger>
            <TabsTrigger value="wins" className="data-[state=active]:bg-esports-accent2 data-[state=active]:text-white">
              Wins
            </TabsTrigger>
            <TabsTrigger value="kills" className="data-[state=active]:bg-esports-accent3 data-[state=active]:text-white">
              Kills
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="points">
            <div className="bg-esports-card rounded-lg border border-esports-accent1/20 overflow-hidden">
              <div className="p-4 bg-esports-accent1/10 border-b border-esports-accent1/20">
                <h3 className="font-display font-bold text-white">Global Points Rankings</h3>
              </div>
              <div className="p-2">
                {filteredPlayers
                  .sort((a, b) => b.points - a.points)
                  .map((player, index) => (
                    <LeaderboardRow 
                      key={player.id} 
                      player={{ ...player, rank: index + 1 }} 
                      type="points" 
                    />
                  ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="wins">
            <div className="bg-esports-card rounded-lg border border-esports-accent1/20 overflow-hidden">
              <div className="p-4 bg-esports-accent2/10 border-b border-esports-accent1/20">
                <h3 className="font-display font-bold text-white">Global Wins Rankings</h3>
              </div>
              <div className="p-2">
                {filteredPlayers
                  .sort((a, b) => b.wins - a.wins)
                  .map((player, index) => (
                    <LeaderboardRow 
                      key={player.id} 
                      player={{ ...player, rank: index + 1 }}
                      type="wins" 
                    />
                  ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="kills">
            <div className="bg-esports-card rounded-lg border border-esports-accent1/20 overflow-hidden">
              <div className="p-4 bg-esports-accent3/10 border-b border-esports-accent1/20">
                <h3 className="font-display font-bold text-white">Global Kills Rankings</h3>
              </div>
              <div className="p-2">
                {filteredPlayers
                  .sort((a, b) => b.kills - a.kills)
                  .map((player, index) => (
                    <LeaderboardRow 
                      key={player.id} 
                      player={{ ...player, rank: index + 1 }}
                      type="kills" 
                    />
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LeaderboardsPage;
