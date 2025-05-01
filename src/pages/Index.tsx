
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Gamepad, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TournamentCard, { TournamentProps } from '@/components/TournamentCard';
import GameCard, { GameProps } from '@/components/GameCard';
import LeaderboardRow, { PlayerProps } from '@/components/LeaderboardRow';

// Sample data (would come from API in a real app)
const featuredTournaments: TournamentProps[] = [
  {
    id: '1',
    title: 'Valorant Champions Tour 2025',
    game: 'Valorant',
    gameImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
    startDate: 'May 15, 2025',
    endDate: 'June 20, 2025',
    prizePool: '$500,000',
    participants: 128,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'League of Legends World Championship',
    game: 'League of Legends',
    gameImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800',
    startDate: 'Sep 10, 2025',
    endDate: 'Oct 30, 2025',
    prizePool: '$2,000,000',
    participants: 24,
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'CS:GO Pro League Season 20',
    game: 'Counter-Strike: Global Offensive',
    gameImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800',
    startDate: 'Mar 1, 2025',
    endDate: 'Mar 25, 2025',
    prizePool: '$1,000,000',
    participants: 32,
    status: 'ongoing'
  }
];

const popularGames: GameProps[] = [
  {
    id: '1',
    name: 'Valorant',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
    tournaments: 24,
    players: 15800,
    popularityRank: 1
  },
  {
    id: '2',
    name: 'League of Legends',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800',
    tournaments: 18,
    players: 32600,
    popularityRank: 2
  },
  {
    id: '3',
    name: 'Counter-Strike 2',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800',
    tournaments: 15,
    players: 28400,
    popularityRank: 3
  },
  {
    id: '4',
    name: 'Dota 2',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800',
    tournaments: 12,
    players: 18200,
    popularityRank: 4
  }
];

const topPlayers: PlayerProps[] = [
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
  }
];

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-hero-pattern bg-cover bg-center py-20 md:py-32">
        <div className="absolute inset-0 bg-esports-background/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-glow text-white">
              The Ultimate eSports <br />Tournament Platform
            </h1>
            <p className="text-lg md:text-xl text-esports-muted mb-10">
              Register for tournaments, track your stats, and earn rewards for your gaming achievements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tournaments">
                <Button size="lg" className="bg-esports-accent1 text-white text-lg hover:bg-esports-accent1/90">
                  Browse Tournaments
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-esports-accent1 text-esports-accent1 text-lg hover:bg-esports-accent1 hover:text-white">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-esports-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-esports-accent1/20 rounded-full flex items-center justify-center">
                <Calendar size={32} className="text-esports-accent1" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-white">Tournaments</h3>
              <p className="text-esports-muted">Join or organize competitive gaming events across multiple platforms</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-esports-accent2/20 rounded-full flex items-center justify-center">
                <Gamepad size={32} className="text-esports-accent2" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-white">Multiple Games</h3>
              <p className="text-esports-muted">Support for all major eSports titles with specialized stat tracking</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-esports-accent3/20 rounded-full flex items-center justify-center">
                <Trophy size={32} className="text-esports-accent3" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-white">Leaderboards</h3>
              <p className="text-esports-muted">Global and tournament-specific rankings based on skill and achievements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-esports-accent1/20 rounded-full flex items-center justify-center">
                <Users size={32} className="text-esports-accent1" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-white">Team Management</h3>
              <p className="text-esports-muted">Create and manage your team, recruit players, and enter competitions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-bold text-white">Featured Tournaments</h2>
            <Link to="/tournaments" className="flex items-center group text-esports-accent1 hover:text-esports-accent1/80">
              <span>View All</span>
              <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Games */}
      <section className="py-16 bg-esports-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-bold text-white">Popular Games</h2>
            <Link to="/games" className="flex items-center group text-esports-accent2 hover:text-esports-accent2/80">
              <span>View All</span>
              <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-bold text-white">Top Players</h2>
            <Link to="/leaderboards" className="flex items-center group text-esports-accent3 hover:text-esports-accent3/80">
              <span>View Full Leaderboards</span>
              <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="bg-esports-card rounded-lg border border-esports-accent1/20 overflow-hidden">
            <div className="p-4 bg-esports-accent1/10 border-b border-esports-accent1/20">
              <h3 className="font-display font-bold text-white">Global Points Rankings</h3>
            </div>
            <div className="p-2">
              {topPlayers.map((player) => (
                <LeaderboardRow key={player.id} player={player} type="points" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-esports-accent1">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
            Ready to Join the Competition?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Create your account today and start participating in tournaments, tracking your stats,
            and earning rewards for your gaming achievements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-esports-accent1 text-lg hover:bg-white/90">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/tournaments">
              <Button size="lg" variant="outline" className="border-white text-white text-lg hover:bg-white/10">
                Browse Tournaments
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
