
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Mail, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with a backend
    console.log('Login attempt with:', { email, password, rememberMe });
    
    // For demo purposes, let's redirect to home after "login"
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <Trophy size={36} className="text-esports-accent1" />
              <span className="text-3xl font-display font-bold animate-glow text-white">
                GloryVerse
              </span>
            </Link>
            <p className="text-esports-muted mt-2">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="bg-esports-card rounded-lg border border-esports-accent1/20 p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
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
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-esports-text">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-esports-accent1 hover:text-esports-accent1/80">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-esports-muted" size={18} />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 bg-esports-background border-esports-accent1/20 text-esports-text"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-esports-accent1/50 data-[state=checked]:bg-esports-accent1 data-[state=checked]:border-esports-accent1"
                  />
                  <Label 
                    htmlFor="remember"
                    className="text-sm text-esports-muted cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-esports-accent1 hover:bg-esports-accent1/90"
                >
                  <LogIn size={18} className="mr-2" />
                  Sign In
                </Button>

                <div className="text-center text-sm text-esports-muted">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-esports-accent1 hover:underline">
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
