
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-esports-card border-t border-esports-accent1/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Trophy size={24} className="text-esports-accent1" />
              <span className="text-xl font-display font-bold text-white">
                GloryVerse
              </span>
            </Link>
            <p className="mt-4 text-esports-muted">
              The ultimate eSports tournament platform for players and organizers.
              Join competitions, track your progress, and earn rewards.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tournaments" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  Teams
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/leaderboards" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  Leaderboards
                </Link>
              </li>
              <li>
                <Link to="/awards" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  Awards
                </Link>
              </li>
              <li>
                <Link to="#" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4 text-white">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link to="#" className="text-esports-muted hover:text-esports-accent1 transition-colors">
                  Organizer Tools
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-esports-accent1/20 mt-8 pt-8 text-center text-esports-muted">
          <p>© {new Date().getFullYear()} GloryVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
