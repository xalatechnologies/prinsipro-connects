import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthError = (error: AuthError) => {
    console.error('Auth error:', error);
    let message = error.message;
    
    // Detailed error handling based on status and code
    if (error.status === 400) {
      switch (error.code) {
        case 'invalid_credentials':
          message = 'Feil e-post eller passord. Sjekk at du har skrevet riktig og prøv igjen.';
          break;
        case 'invalid_grant':
          message = 'Innloggingsinformasjonen er utløpt. Vennligst logg inn på nytt.';
          break;
        default:
          message = 'Ugyldig forespørsel. Sjekk at all informasjon er korrekt.';
      }
    } else if (error.status === 401) {
      message = 'Sesjonen din har utløpt. Vennligst logg inn på nytt.';
    } else if (error.status === 404) {
      message = 'Finner ikke brukeren. Sjekk at e-postadressen er riktig eller opprett en ny konto.';
    } else if (error.status === 422) {
      switch (error.code) {
        case 'user_already_exists':
          message = 'Denne e-postadressen er allerede registrert. Prøv å logge inn eller tilbakestill passordet.';
          break;
        case 'invalid_password':
          message = 'Passordet må være minst 6 tegn langt og inneholde minst ett tall og én bokstav.';
          break;
        default:
          message = 'Ugyldig input. Sjekk at all informasjon er korrekt.';
      }
    } else if (error.status === 429) {
      message = 'For mange forsøk. Vennligst vent noen minutter før du prøver igjen.';
    } else {
      message = 'Det oppstod en uventet feil. Vennligst prøv igjen senere eller kontakt support.';
    }

    toast({
      title: 'Autentiseringsfeil',
      description: message,
      variant: 'destructive',
      duration: 5000
    });
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      handleAuthError(error as AuthError);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;

      toast({
        title: 'Registrering vellykket',
        description: 'Du kan nå logge inn med din e-post og passord.',
        duration: 5000
      });
    } catch (error) {
      handleAuthError(error as AuthError);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      handleAuthError(error as AuthError);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });
      if (error) throw error;
      toast({
        title: 'Tilbakestilling av passord',
        description: 'Sjekk e-posten din for instruksjoner.'
      });
    } catch (error) {
      handleAuthError(error as AuthError);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}