
import React from 'react';
import { 
  Users, 
  Trophy, 
  Calendar, 
  ArrowUp, 
  ArrowDown,
  TrendingUp
} from 'lucide-react';

const AdminOverview: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-display font-bold mb-6 text-white">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-esports-muted text-sm">Total Users</p>
              <h3 className="text-3xl font-display font-bold text-white mt-1">8,249</h3>
            </div>
            <div className="p-3 bg-esports-accent1/20 rounded-full">
              <Users size={20} className="text-esports-accent1" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500">12.5%</span>
            <span className="text-esports-muted ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-esports-muted text-sm">Active Tournaments</p>
              <h3 className="text-3xl font-display font-bold text-white mt-1">24</h3>
            </div>
            <div className="p-3 bg-esports-accent2/20 rounded-full">
              <Calendar size={20} className="text-esports-accent2" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500">8.3%</span>
            <span className="text-esports-muted ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-esports-muted text-sm">Registered Teams</p>
              <h3 className="text-3xl font-display font-bold text-white mt-1">156</h3>
            </div>
            <div className="p-3 bg-esports-accent3/20 rounded-full">
              <Users size={20} className="text-esports-accent3" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500">5.2%</span>
            <span className="text-esports-muted ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-esports-muted text-sm">Total Revenue</p>
              <h3 className="text-3xl font-display font-bold text-white mt-1">$12,845</h3>
            </div>
            <div className="p-3 bg-green-500/20 rounded-full">
              <TrendingUp size={20} className="text-green-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowDown size={16} className="text-red-500 mr-1" />
            <span className="text-red-500">3.1%</span>
            <span className="text-esports-muted ml-2">vs last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Upcoming Tournaments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-esports-card border border-esports-accent1/20 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-esports-accent1/20">
            <h3 className="font-display font-bold text-white">Recent Activity</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              <li className="border-b border-esports-accent1/10 pb-4">
                <p className="text-white">New tournament created: <span className="text-esports-accent1">Valorant Masters 2025</span></p>
                <p className="text-xs text-esports-muted mt-1">2 hours ago by Admin</p>
              </li>
              <li className="border-b border-esports-accent1/10 pb-4">
                <p className="text-white">Team <span className="text-esports-accent1">Cyber Dragons</span> registered for CS:GO Pro League</p>
                <p className="text-xs text-esports-muted mt-1">5 hours ago</p>
              </li>
              <li className="border-b border-esports-accent1/10 pb-4">
                <p className="text-white">User <span className="text-esports-accent1">ProSniper</span> won the Valorant Solo Tournament</p>
                <p className="text-xs text-esports-muted mt-1">Yesterday at 8:30 PM</p>
              </li>
              <li className="border-b border-esports-accent1/10 pb-4">
                <p className="text-white">New game added: <span className="text-esports-accent1">Apex Legends</span></p>
                <p className="text-xs text-esports-muted mt-1">Yesterday at 2:15 PM by Admin</p>
              </li>
              <li>
                <p className="text-white">Award <span className="text-esports-accent1">Tournament Champion</span> granted to Team Phoenix Flames</p>
                <p className="text-xs text-esports-muted mt-1">2 days ago</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Upcoming Tournaments */}
        <div className="bg-esports-card border border-esports-accent1/20 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-esports-accent1/20">
            <h3 className="font-display font-bold text-white">Upcoming Tournaments</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              <li className="flex items-center justify-between border-b border-esports-accent1/10 pb-4">
                <div>
                  <p className="text-white">Valorant Champions Tour 2025</p>
                  <p className="text-xs text-esports-muted mt-1">May 15, 2025 - June 20, 2025</p>
                </div>
                <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">Upcoming</span>
              </li>
              <li className="flex items-center justify-between border-b border-esports-accent1/10 pb-4">
                <div>
                  <p className="text-white">League of Legends World Championship</p>
                  <p className="text-xs text-esports-muted mt-1">Sep 10, 2025 - Oct 30, 2025</p>
                </div>
                <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">Upcoming</span>
              </li>
              <li className="flex items-center justify-between border-b border-esports-accent1/10 pb-4">
                <div>
                  <p className="text-white">CS:GO Pro League Season 20</p>
                  <p className="text-xs text-esports-muted mt-1">Mar 1, 2025 - Mar 25, 2025</p>
                </div>
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Ongoing</span>
              </li>
              <li className="flex items-center justify-between border-b border-esports-accent1/10 pb-4">
                <div>
                  <p className="text-white">Rocket League Championship Series</p>
                  <p className="text-xs text-esports-muted mt-1">Apr 2, 2025 - June 5, 2025</p>
                </div>
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Ongoing</span>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="text-white">Fortnite World Cup</p>
                  <p className="text-xs text-esports-muted mt-1">July 12, 2025 - July 28, 2025</p>
                </div>
                <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">Upcoming</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
