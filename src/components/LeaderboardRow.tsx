
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface PlayerProps {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  game: string;
  wins: number;
  kills: number;
  points: number;
}

const LeaderboardRow: React.FC<{ player: PlayerProps; type: 'wins' | 'kills' | 'points' }> = ({ 
  player, 
  type 
}) => {
  const getStatValue = () => {
    switch (type) {
      case 'wins': return player.wins;
      case 'kills': return player.kills;
      case 'points': return player.points;
      default: return player.points;
    }
  };

  const getStatLabel = () => {
    switch (type) {
      case 'wins': return 'Wins';
      case 'kills': return 'Kills';
      case 'points': return 'Points';
      default: return 'Points';
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500';
      case 2: return 'bg-gray-400';
      case 3: return 'bg-amber-600';
      default: return 'bg-esports-card';
    }
  };

  return (
    <Link 
      to={`/players/${player.id}`}
      className="flex items-center justify-between py-3 px-4 hover:bg-esports-card/60 transition-colors rounded-md"
    >
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankStyle(player.rank)} text-white font-bold`}>
          {player.rank}
        </div>
        <Avatar className="h-10 w-10 border border-esports-accent1/50">
          <AvatarImage src={player.avatar} alt={player.username} />
          <AvatarFallback className="bg-esports-accent1/20 text-white">
            {player.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-display font-medium text-white">{player.username}</h4>
          <span className="text-xs text-esports-muted">{player.game}</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-xl font-display font-bold text-white">{getStatValue()}</div>
        <div className="text-xs text-esports-muted">{getStatLabel()}</div>
      </div>
    </Link>
  );
};

export default LeaderboardRow;
