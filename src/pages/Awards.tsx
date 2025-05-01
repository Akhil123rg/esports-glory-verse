
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AwardCard, { AwardProps } from '@/components/AwardCard';

// Sample awards data (would come from an API in a real app)
const awardsData: AwardProps[] = [
  {
    id: '1',
    name: 'Ace Marksman',
    description: 'Achieved exceptional accuracy in competitive matches',
    image: '',
    tier: 'bronze',
    requirements: 'Maintain 30% headshot rate over 20 matches',
    pointsValue: 100
  },
  {
    id: '2',
    name: 'Sharpshooter',
    description: 'Demonstrated superior aiming skills in combat',
    image: '',
    tier: 'silver',
    requirements: 'Maintain 40% headshot rate over 30 matches',
    pointsValue: 250
  },
  {
    id: '3',
    name: 'Precision Master',
    description: 'Reached the pinnacle of accuracy in competitive play',
    image: '',
    tier: 'gold',
    requirements: 'Maintain 50% headshot rate over 50 matches',
    pointsValue: 500
  },
  {
    id: '4',
    name: 'Clutch Player',
    description: 'Successfully won rounds while being the last player standing',
    image: '',
    tier: 'bronze',
    requirements: 'Win 10 rounds as the last player standing',
    pointsValue: 150
  },
  {
    id: '5',
    name: 'Comeback King',
    description: 'Led your team to victory from significant point deficits',
    image: '',
    tier: 'silver',
    requirements: 'Win 5 matches after being down by 7+ points',
    pointsValue: 300
  },
  {
    id: '6',
    name: 'Unstoppable Force',
    description: 'Dominated opponents with an impressive win streak',
    image: '',
    tier: 'gold',
    requirements: 'Win 15 consecutive matches',
    pointsValue: 600
  },
  {
    id: '7',
    name: 'Quadra Kill Expert',
    description: 'Consistently eliminated multiple opponents in quick succession',
    image: '',
    tier: 'bronze',
    requirements: 'Achieve 20 quadra kills in competitive matches',
    pointsValue: 200
  },
  {
    id: '8',
    name: 'Penta Kill Champion',
    description: 'Eliminated entire enemy teams single-handedly multiple times',
    image: '',
    tier: 'silver',
    requirements: 'Achieve 10 penta kills in competitive matches',
    pointsValue: 400
  },
  {
    id: '9',
    name: 'Ultimate Annihilator',
    description: 'Reached legendary status with flawless team eliminations',
    image: '',
    tier: 'gold',
    requirements: 'Achieve 5 penta kills in a single tournament',
    pointsValue: 800
  },
  {
    id: '10',
    name: 'Tournament Finalist',
    description: 'Reached the final stage of a major tournament',
    image: '',
    tier: 'bronze',
    requirements: 'Reach the finals of any official tournament',
    pointsValue: 300
  },
  {
    id: '11',
    name: 'Tournament Champion',
    description: 'Won a major tournament against elite competition',
    image: '',
    tier: 'silver',
    requirements: 'Win any official tournament',
    pointsValue: 600
  },
  {
    id: '12',
    name: 'Grand Slam Champion',
    description: 'Won multiple premier tournaments in a single season',
    image: '',
    tier: 'gold',
    requirements: 'Win 3 major tournaments in a single season',
    pointsValue: 1000
  },
  {
    id: '13',
    name: 'Strategic Genius',
    description: 'Demonstrated exceptional tactical awareness and team coordination',
    image: '',
    tier: 'platinum',
    requirements: 'Maintain 80% objective completion rate in 50+ matches',
    pointsValue: 1500
  },
  {
    id: '14',
    name: 'Legendary Competitor',
    description: 'Achieved extraordinary success across multiple games and tournaments',
    image: '',
    tier: 'diamond',
    requirements: 'Reach top 10 ranking in 3 different game titles',
    pointsValue: 2000
  }
];

const AwardsPage: React.FC = () => {
  // Group awards by tier
  const bronzeAwards = awardsData.filter(award => award.tier === 'bronze');
  const silverAwards = awardsData.filter(award => award.tier === 'silver');
  const goldAwards = awardsData.filter(award => award.tier === 'gold');
  const platinumAwards = awardsData.filter(award => award.tier === 'platinum');
  const diamondAwards = awardsData.filter(award => award.tier === 'diamond');

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-8 text-white">Awards System</h1>
        
        <div className="mb-8">
          <p className="text-esports-muted max-w-3xl">
            The Virtual Award System recognizes player achievements across all games and tournaments.
            Earn awards based on your performance, skill level, and participation. Collect points
            to unlock exclusive rewards and climb the tier system from Bronze to Diamond.
          </p>
        </div>

        {/* Award Tiers Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 bg-esports-card border border-esports-accent1/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-esports-card data-[state=active]:text-white">
              All Tiers
            </TabsTrigger>
            <TabsTrigger value="bronze" className="data-[state=active]:bg-amber-800 data-[state=active]:text-white">
              Bronze
            </TabsTrigger>
            <TabsTrigger value="silver" className="data-[state=active]:bg-gray-500 data-[state=active]:text-white">
              Silver
            </TabsTrigger>
            <TabsTrigger value="gold" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
              Gold
            </TabsTrigger>
            <TabsTrigger value="platinum" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              Platinum
            </TabsTrigger>
            <TabsTrigger value="diamond" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Diamond
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {awardsData.map(award => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="bronze">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {bronzeAwards.map(award => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="silver">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {silverAwards.map(award => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="gold">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {goldAwards.map(award => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="platinum">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {platinumAwards.map(award => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="diamond">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {diamondAwards.map(award => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* How Awards Work */}
        <div className="mt-16 bg-esports-card rounded-lg border border-esports-accent1/20 p-6">
          <h2 className="text-2xl font-display font-bold mb-4 text-white">How The Award System Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-esports-accent1/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-esports-accent1 font-display font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2 text-white">Earn Points</h3>
              <p className="text-esports-muted">
                Participate in tournaments, win matches, and complete achievements to earn award points.
                Different actions award different point values based on difficulty and prestige.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-esports-accent2/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-esports-accent2 font-display font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2 text-white">Unlock Awards</h3>
              <p className="text-esports-muted">
                As you meet specific requirements, you'll unlock awards across different tiers.
                Each award represents a milestone in your competitive gaming journey.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-esports-accent3/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-esports-accent3 font-display font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2 text-white">Claim Rewards</h3>
              <p className="text-esports-muted">
                Awards come with exclusive rewards, including profile badges, custom avatars, 
                and even real-world prizes for top-tier achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsPage;
