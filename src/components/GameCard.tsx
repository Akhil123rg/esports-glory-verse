
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';

export interface GameProps {
  id: string;
  name: string;
  image: string;
  tournaments: number;
  players: number;
  popularityRank: number;
}

const GameCard: React.FC<{ game: GameProps }> = ({ game }) => {
  return (
    <div className="esports-card group">
      {/* Game Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={game.image} 
          alt={game.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-esports-background to-transparent"></div>
        <div className="absolute bottom-3 right-3 bg-esports-accent1 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
          #{game.popularityRank}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-display font-bold mb-4 text-white">
          {game.name}
        </h3>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-esports-muted">
            <Calendar size={14} className="text-esports-accent1" />
            <span>{game.tournaments} Active Tournaments</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-esports-muted">
            <Users size={14} className="text-esports-accent2" />
            <span>{game.players} Registered Players</span>
          </div>
        </div>

        <Link 
          to={`/games/${game.id}`}
          className="esports-button-secondary inline-block w-full text-center"
        >
          View Game Details
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
