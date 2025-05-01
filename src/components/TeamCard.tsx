
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Trophy, Gamepad } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface TeamProps {
  id: string;
  name: string;
  logo: string;
  members: number;
  primaryGame: string;
  wins: number;
}

const TeamCard: React.FC<{ team: TeamProps }> = ({ team }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="esports-card p-5">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-16 w-16 border-2 border-esports-accent2">
          <AvatarImage src={team.logo} alt={team.name} />
          <AvatarFallback className="bg-esports-accent2 text-white font-display">
            {getInitials(team.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-display font-bold text-white">
            {team.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-esports-muted">
            <Gamepad size={14} className="text-esports-accent2" />
            <span>{team.primaryGame}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-esports-muted">
          <Users size={14} className="text-esports-accent1" />
          <span>{team.members} Members</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-esports-muted">
          <Trophy size={14} className="text-esports-accent3" />
          <span>{team.wins} Wins</span>
        </div>
      </div>

      <Link 
        to={`/teams/${team.id}`}
        className="esports-button-accent inline-block w-full text-center"
      >
        View Team
      </Link>
    </div>
  );
};

export default TeamCard;
