
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import GameCard, { GameProps } from '@/components/GameCard';

// Sample games data (would come from an API in a real app)
const gamesData: GameProps[] = [
  {
    id: '1',
    name: 'Valorant',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1270790/header.jpg',
    tournaments: 24,
    players: 15800,
    popularityRank: 1
  },
  {
    id: '2',
    name: 'League of Legends',
    image: 'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b',
    tournaments: 18,
    players: 32600,
    popularityRank: 2
  },
  {
    id: '3',
    name: 'Counter-Strike 2',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg',
    tournaments: 15,
    players: 28400,
    popularityRank: 3
  },
  {
    id: '4',
    name: 'Dota 2',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg',
    tournaments: 12,
    players: 18200,
    popularityRank: 4
  },
  {
    id: '5',
    name: 'Fortnite',
    image: 'https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg',
    tournaments: 9,
    players: 24500,
    popularityRank: 5
  },
  {
    id: '6',
    name: 'Overwatch 2',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/header.jpg',
    tournaments: 8,
    players: 12800,
    popularityRank: 6
  },
  {
    id: '7',
    name: 'Rocket League',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg',
    tournaments: 7,
    players: 9600,
    popularityRank: 7
  },
  {
    id: '8',
    name: 'Rainbow Six Siege',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg',
    tournaments: 6,
    players: 8200,
    popularityRank: 8
  },
  {
    id: '9',
    name: 'Call of Duty: Modern Warfare',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/header.jpg',
    tournaments: 5,
    players: 14300,
    popularityRank: 9
  },
  {
    id: '10',
    name: 'Apex Legends',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg',
    tournaments: 4,
    players: 11200,
    popularityRank: 10
  },
  {
    id: '11',
    name: 'FIFA 25',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/header.jpg',
    tournaments: 4,
    players: 9800,
    popularityRank: 11
  },
  {
    id: '12',
    name: 'Street Fighter 6',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/header.jpg',
    tournaments: 3,
    players: 6200,
    popularityRank: 12
  }
];

const GamesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter games based on search term
  const filteredGames = gamesData.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-8 text-white">Games</h1>

        {/* Search */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
            <Input 
              type="text" 
              placeholder="Search games..." 
              className="pl-10 bg-esports-card border-esports-accent1/20 text-esports-text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-esports-muted">
            No games found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage;
