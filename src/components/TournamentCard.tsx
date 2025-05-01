
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface TournamentProps {
  id: string;
  title: string;
  game: string;
  gameImage: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const TournamentCard: React.FC<{ tournament: TournamentProps }> = ({ tournament }) => {
  const statusColors = {
    upcoming: 'bg-yellow-600',
    ongoing: 'bg-green-600',
    completed: 'bg-gray-600'
  };

  return (
    <div className="esports-card">
      {/* Game Image */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={tournament.gameImage} 
          alt={tournament.game}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-esports-background to-transparent"></div>
        <Badge 
          className={`absolute top-3 right-3 ${statusColors[tournament.status]} border-none text-white`}
        >
          {tournament.status}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-display font-bold mb-2 text-white">
          {tournament.title}
        </h3>
        <p className="text-esports-muted mb-4">{tournament.game}</p>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-esports-muted">
            <Calendar size={14} className="text-esports-accent1" />
            <span>{tournament.startDate} - {tournament.endDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-esports-muted">
            <Trophy size={14} className="text-esports-accent2" />
            <span>Prize Pool: {tournament.prizePool}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-esports-muted">
            <Users size={14} className="text-esports-accent3" />
            <span>{tournament.participants} Participants</span>
          </div>
        </div>

        <Link 
          to={`/tournaments/${tournament.id}`}
          className="esports-button inline-block w-full text-center"
        >
          View Tournament
        </Link>
      </div>
    </div>
  );
};

export default TournamentCard;
