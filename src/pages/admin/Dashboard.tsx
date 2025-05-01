
import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Calendar, 
  Gamepad, 
  Users, 
  Award, 
  Settings, 
  BarChart3,
  PlusCircle,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// Import admin panel pages
import AdminOverview from './Overview';
import AdminTournaments from './Tournaments';
import AdminGames from './Games';
import AdminTeams from './Teams';
import AdminAwards from './Awards';
import AdminSettings from './Settings';

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-esports-background text-esports-text flex">
      {/* Sidebar - Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-esports-card rounded-md text-esports-text hover:text-esports-accent1"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`w-64 bg-esports-card border-r border-esports-accent1/20 fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-30`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b border-esports-accent1/20">
            <Link to="/" className="flex items-center gap-2">
              <Trophy size={24} className="text-esports-accent1" />
              <span className="text-xl font-display font-bold text-white">
                GloryVerse
              </span>
            </Link>
            <div className="text-xs text-esports-muted mt-1">Admin Dashboard</div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
            <Link 
              to="/admin" 
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-esports-accent1/10 text-esports-muted hover:text-esports-accent1 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <BarChart3 size={20} />
              <span>Overview</span>
            </Link>
            <Link 
              to="/admin/tournaments" 
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-esports-accent1/10 text-esports-muted hover:text-esports-accent1 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Calendar size={20} />
              <span>Tournaments</span>
            </Link>
            <Link 
              to="/admin/games" 
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-esports-accent1/10 text-esports-muted hover:text-esports-accent1 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Gamepad size={20} />
              <span>Games</span>
            </Link>
            <Link 
              to="/admin/teams" 
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-esports-accent1/10 text-esports-muted hover:text-esports-accent1 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Users size={20} />
              <span>Teams</span>
            </Link>
            <Link 
              to="/admin/awards" 
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-esports-accent1/10 text-esports-muted hover:text-esports-accent1 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Award size={20} />
              <span>Awards</span>
            </Link>
            <div className="pt-2 pb-2">
              <div className="border-t border-esports-accent1/20"></div>
            </div>
            <Link 
              to="/admin/settings" 
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-esports-accent1/10 text-esports-muted hover:text-esports-accent1 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-esports-accent1/20">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-esports-accent1/20 flex items-center justify-center text-esports-accent1 font-semibold">
                A
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin User</p>
                <button 
                  onClick={() => navigate('/')}
                  className="text-xs text-esports-muted hover:text-esports-accent1 flex items-center gap-1"
                >
                  <LogOut size={12} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-esports-card border-b border-esports-accent1/20 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-display font-bold text-white">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-esports-muted hover:text-esports-accent1 transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-esports-accent3 rounded-full"></span>
              </button>
              <Link 
                to="/admin/tournaments/new" 
                className="hidden sm:flex items-center gap-2 bg-esports-accent1 text-white px-4 py-2 rounded-md hover:bg-esports-accent1/90 transition-colors"
              >
                <PlusCircle size={16} />
                <span>New Tournament</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/tournaments/*" element={<AdminTournaments />} />
            <Route path="/games/*" element={<AdminGames />} />
            <Route path="/teams/*" element={<AdminTeams />} />
            <Route path="/awards/*" element={<AdminAwards />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
