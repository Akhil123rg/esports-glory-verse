
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/chat/ChatWidget";

// Pages
import HomePage from "./pages/Index";
import TournamentsPage from "./pages/Tournaments";
import TournamentDetailsPage from "./pages/TournamentDetails";
import GamesPage from "./pages/Games";
import GameDetailsPage from "./pages/GameDetails";
import TeamsPage from "./pages/Teams";
import TeamDetailsPage from "./pages/TeamDetails";
import LeaderboardsPage from "./pages/Leaderboards";
import AwardsPage from "./pages/Awards";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import EmailVerifiedPage from "./pages/EmailVerified";
import ProfilePage from "./pages/Profile";
import AdminDashboardPage from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tournaments" element={<TournamentsPage />} />
                <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/games/:id" element={<GameDetailsPage />} />
                <Route path="/teams" element={<TeamsPage />} />
                <Route path="/teams/:id" element={<TeamDetailsPage />} />
                <Route path="/leaderboards" element={<LeaderboardsPage />} />
                <Route path="/awards" element={<AwardsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/email-verified" element={<EmailVerifiedPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin/*" element={<AdminDashboardPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
