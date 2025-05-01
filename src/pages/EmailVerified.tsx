
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmailVerified: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <Trophy size={36} className="text-esports-accent1" />
              <span className="text-3xl font-display font-bold animate-glow text-white">
                GloryVerse
              </span>
            </Link>
          </div>

          {/* Success Card */}
          <div className="bg-esports-card rounded-lg border border-esports-accent1/20 p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              
              <h1 className="text-2xl font-display font-semibold text-white">Email Verified!</h1>
              
              <p className="text-esports-muted">
                Your email has been successfully verified. You can now sign in to your account.
              </p>
              
              <div className="pt-4 w-full">
                <Button className="w-full bg-esports-accent1 hover:bg-esports-accent1/90" asChild>
                  <Link to="/login">Sign In Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;
