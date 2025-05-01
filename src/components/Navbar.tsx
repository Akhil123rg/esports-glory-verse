
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Trophy, Calendar, Gamepad, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-esports-card border-b border-esports-accent1/20 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Trophy size={28} className="text-esports-accent1" />
            <span className="text-2xl font-display font-bold animate-glow text-white">
              GloryVerse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/tournaments" className="flex items-center gap-2 text-esports-text hover:text-esports-accent1 transition-colors">
              <Calendar size={18} />
              <span>Tournaments</span>
            </Link>
            <Link to="/games" className="flex items-center gap-2 text-esports-text hover:text-esports-accent1 transition-colors">
              <Gamepad size={18} />
              <span>Games</span>
            </Link>
            <Link to="/teams" className="flex items-center gap-2 text-esports-text hover:text-esports-accent1 transition-colors">
              <Users size={18} />
              <span>Teams</span>
            </Link>
            <Link to="/leaderboards" className="flex items-center gap-2 text-esports-text hover:text-esports-accent1 transition-colors">
              <Trophy size={18} />
              <span>Leaderboards</span>
            </Link>
            <Link to="/awards" className="flex items-center gap-2 text-esports-text hover:text-esports-accent1 transition-colors">
              <Award size={18} />
              <span>Awards</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="border-esports-accent1 text-esports-accent1 hover:bg-esports-accent1 hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-esports-accent1 text-white hover:bg-esports-accent1/90">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-esports-text hover:text-esports-accent1 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-esports-accent1/20 mt-4 flex flex-col gap-4">
            <Link 
              to="/tournaments" 
              className="flex items-center gap-2 text-esports-text hover:text-esports-accent1 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar size={18} />
              <span>Tournaments</span>
            </Link>
            <Link 
              to="/games" 
              className="flex items-center gap-2 text-esports-text hover:text-esports-accent1 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Gamepad size={18} />
              <span>Games</span>
            </Link>
            <Link 
              to="/teams" 
              className="flex items-center gap-2 text-esports-text hover:text-esports-accent1 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users size={18} />
              <span>Teams</span>
            </Link>
            <Link 
              to="/leaderboards" 
              className="flex items-center gap-2 text-esports-text hover:text-esports-accent1 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Trophy size={18} />
              <span>Leaderboards</span>
            </Link>
            <Link 
              to="/awards" 
              className="flex items-center gap-2 text-esports-text hover:text-esports-accent1 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Award size={18} />
              <span>Awards</span>
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-esports-accent1/20">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-esports-accent1 text-esports-accent1 hover:bg-esports-accent1 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-esports-accent1 text-white hover:bg-esports-accent1/90">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
