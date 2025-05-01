
import React from 'react';
import { Award } from 'lucide-react';

export interface AwardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  requirements: string;
  pointsValue: number;
}

const AwardCard: React.FC<{ award: AwardProps }> = ({ award }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'from-amber-700 to-amber-900';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-cyan-400 to-cyan-600';
      case 'diamond': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="esports-card overflow-visible">
      <div className={`relative h-36 bg-gradient-to-br ${getTierColor(award.tier)} flex items-center justify-center`}>
        {award.image ? (
          <img 
            src={award.image} 
            alt={award.name}
            className="h-28 w-28 object-contain drop-shadow-lg animate-float"
          />
        ) : (
          <Award size={90} className="text-white/90 drop-shadow-lg animate-float" />
        )}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-esports-card px-4 py-1 rounded-full border border-esports-accent1/30 text-sm font-display uppercase text-white">
          {award.tier} tier
        </div>
      </div>
      <div className="p-5 pt-8 text-center">
        <h3 className="text-lg font-display font-bold mb-2 text-white">
          {award.name}
        </h3>
        <p className="text-sm text-esports-muted mb-3">{award.description}</p>
        <div className="mb-3">
          <span className="text-xs text-esports-muted">Requirements:</span>
          <p className="text-sm text-white">{award.requirements}</p>
        </div>
        <div className="w-full bg-esports-background rounded-full h-1 mb-1">
          <div className="bg-esports-accent1 h-1 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <div className="flex justify-between text-xs text-esports-muted">
          <span>Progress</span>
          <span>{award.pointsValue} points</span>
        </div>
      </div>
    </div>
  );
};

export default AwardCard;
