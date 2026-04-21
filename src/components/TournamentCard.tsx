
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

  // Get appropriate game image based on the game name
  const getGameImage = () => {
    // Return the provided game image if it exists
    if (tournament.gameImage) {
      return tournament.gameImage;
    }
    
    // Fallback images based on game name
    switch(tournament.game.toLowerCase()) {
      case 'counter-strike 2':
      case 'counter-strike':
      case 'cs2':
      case 'cs:go':
      case 'counter-strike: global offensive':
        return 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg';
      case 'valorant':
        return 'https://cdn.cloudflare.steamstatic.com/steam/apps/1270790/header.jpg';
      case 'league of legends':
      case 'lol':
        return 'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b';
      case 'dota 2':
        return 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg';
      case 'call of duty':
      case 'cod':
      case 'call of duty: modern warfare':
        return 'https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/header.jpg';
      case 'fortnite':
        return 'https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg';
      case 'overwatch':
      case 'overwatch 2':
        return 'https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/header.jpg';
      case 'rocket league':
        return 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg';
      case 'rainbow six siege':
        return 'https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg';
      default:
        return 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg';
    }
  };

  return (
    <div className="esports-card">
      {/* Game Image */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={getGameImage()} 
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
