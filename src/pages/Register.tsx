
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, Mail, User, Lock, UserPlus, Gamepad, Users, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const RegisterPage: React.FC = () => {
  const [accountType, setAccountType] = useState('player');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [primaryGame, setPrimaryGame] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // For organizer account
  const [organizationName, setOrganizationName] = useState('');
  const [website, setWebsite] = useState('');

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the Terms of Service and Privacy Policy.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const metadata = accountType === 'player' 
        ? { 
            username,
            full_name: username, // We can improve this later by adding a full name field
            primary_game: primaryGame,
            account_type: 'player'
          }
        : {
            username: organizationName,
            full_name: organizationName,
            website,
            account_type: 'organizer'
          };

      await signUp(email, password, metadata);
      
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      // Error is already handled in the signUp function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <Trophy size={36} className="text-esports-accent1" />
              <span className="text-3xl font-display font-bold animate-glow text-white">
                GloryVerse
              </span>
            </Link>
            <p className="text-esports-muted mt-2">Create your account</p>
          </div>

          {/* Registration Form */}
          <div className="bg-esports-card rounded-lg border border-esports-accent1/20 p-8">
            <Tabs defaultValue="player" onValueChange={(value) => setAccountType(value)} className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="player" className="data-[state=active]:bg-esports-accent1">
                  <div className="flex items-center gap-2">
                    <Gamepad size={18} />
                    <span>Player Account</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="organizer" className="data-[state=active]:bg-esports-accent2">
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>Organizer Account</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                <TabsContent value="player" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-esports-text">Username</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
                        <Input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Choose a username"
                          className="pl-10 bg-esports-background border-esports-accent1/20 text-esports-text"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-esports-text">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="pl-10 bg-esports-background border-esports-accent1/20 text-esports-text"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-esports-text">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a password"
                          className="pl-10 pr-10 bg-esports-background border-esports-accent1/20 text-esports-text"
                          required
                          disabled={isLoading}
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-esports-muted hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-esports-text">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10 bg-esports-background border-esports-accent1/20 text-esports-text"
                          required
                          disabled={isLoading}
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-esports-muted hover:text-white"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryGame" className="text-esports-text">Primary Game</Label>
                    <Select value={primaryGame} onValueChange={setPrimaryGame} disabled={isLoading}>
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

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="termsPlayer" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      className="border-esports-accent1/50 data-[state=checked]:bg-esports-accent1 data-[state=checked]:border-esports-accent1"
                      required
                      disabled={isLoading}
                    />
                    <Label 
                      htmlFor="termsPlayer"
                      className="text-sm text-esports-muted cursor-pointer"
                    >
                      I agree to the{' '}
                      <Link to="/terms" className="text-esports-accent1 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-esports-accent1 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-esports-accent1 hover:bg-esports-accent1/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <UserPlus size={18} className="mr-2" />
                        Create Player Account
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="organizer" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organizationName" className="text-esports-text">Organization Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
                        <Input
                          id="organizationName"
                          type="text"
                          value={organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                          placeholder="Enter organization name"
                          className="pl-10 bg-esports-background border-esports-accent1/20 text-esports-text"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizerEmail" className="text-esports-text">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
                        <Input
                          id="organizerEmail"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter organization email"
                          className="pl-10 bg-esports-background border-esports-accent1/20 text-esports-text"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organizerPassword" className="text-esports-text">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
                        <Input
                          id="organizerPassword"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a password"
                          className="pl-10 pr-10 bg-esports-background border-esports-accent1/20 text-esports-text"
                          required
                          disabled={isLoading}
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-esports-muted hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizerConfirmPassword" className="text-esports-text">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
                        <Input
                          id="organizerConfirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10 bg-esports-background border-esports-accent1/20 text-esports-text"
                          required
                          disabled={isLoading}
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-esports-muted hover:text-white"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-esports-text">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://your-organization.com"
                      className="bg-esports-background border-esports-accent1/20 text-esports-text"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="termsOrganizer" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      className="border-esports-accent1/50 data-[state=checked]:bg-esports-accent1 data-[state=checked]:border-esports-accent1"
                      required
                      disabled={isLoading}
                    />
                    <Label 
                      htmlFor="termsOrganizer"
                      className="text-sm text-esports-muted cursor-pointer"
                    >
                      I agree to the{' '}
                      <Link to="/terms" className="text-esports-accent1 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-esports-accent1 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-esports-accent2 hover:bg-esports-accent2/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <UserPlus size={18} className="mr-2" />
                        Create Organizer Account
                      </>
                    )}
                  </Button>
                </TabsContent>
              </form>

              <div className="text-center text-sm text-esports-muted mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-esports-accent1 hover:underline">
                  Sign In
                </Link>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
