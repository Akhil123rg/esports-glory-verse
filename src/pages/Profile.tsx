
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  username: string;
  full_name: string;
  primary_game: string | null;
  avatar_url: string | null;
}

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [primaryGame, setPrimaryGame] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, full_name, primary_game, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfile(data);
          setUsername(data.username || '');
          setFullName(data.full_name || '');
          setPrimaryGame(data.primary_game || '');
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error loading profile',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate, toast]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setUpdating(true);
      
      const updates = {
        username,
        full_name: fullName,
        primary_game: primaryGame,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      
      setProfile(prev => ({ ...prev!, ...updates }));
      
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-esports-accent1" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-8 text-white">Your Profile</h1>

          <div className="bg-esports-card border border-esports-accent1/20 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <Avatar className="h-28 w-28">
                {profile?.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt={profile.username || 'User'} />
                ) : (
                  <AvatarFallback className="bg-esports-accent1/20 text-esports-accent1 text-2xl">
                    {getInitials(fullName || username || 'User')}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="text-center md:text-left">
                <h2 className="text-2xl font-display font-bold text-white">{profile?.username}</h2>
                <p className="text-esports-muted">Member since {new Date(user?.created_at || '').toLocaleDateString()}</p>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-auto">
                <Button
                  variant="outline"
                  className="border-esports-accent1 text-esports-accent1 hover:bg-esports-accent1 hover:text-white"
                  onClick={handleSignOut}
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-esports-text">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 bg-esports-background border-esports-accent1/20 text-esports-text"
                      disabled={updating}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-esports-text">Full Name</Label>
                  <Input
                    id="fullname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-esports-background border-esports-accent1/20 text-esports-text"
                    disabled={updating}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryGame" className="text-esports-text">Primary Game</Label>
                <Select value={primaryGame} onValueChange={setPrimaryGame} disabled={updating}>
                  <SelectTrigger id="primaryGame" className="bg-esports-background border-esports-accent1/20 text-esports-text">
                    <SelectValue placeholder="Select your main game" />
                  </SelectTrigger>
                  <SelectContent className="bg-esports-card border-esports-accent1/20">
                    <SelectItem value="valorant">Valorant</SelectItem>
                    <SelectItem value="league-of-legends">League of Legends</SelectItem>
                    <SelectItem value="counter-strike-2">Counter-Strike 2</SelectItem>
                    <SelectItem value="dota-2">Dota 2</SelectItem>
                    <SelectItem value="fortnite">Fortnite</SelectItem>
                    <SelectItem value="overwatch-2">Overwatch 2</SelectItem>
                    <SelectItem value="apex-legends">Apex Legends</SelectItem>
                    <SelectItem value="rocket-league">Rocket League</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="bg-esports-accent1 hover:bg-esports-accent1/90"
                disabled={updating}
              >
                {updating ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
