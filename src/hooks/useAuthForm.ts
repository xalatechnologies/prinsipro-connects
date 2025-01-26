import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/toast';

interface UseAuthFormProps {
  mode: 'signin' | 'signup' | 'reset';
}

export function useAuthForm({ mode }: UseAuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setFormError('Vennligst skriv inn e-postadressen din');
      return false;
    }
    if (!emailRegex.test(email)) {
      setFormError('Vennligst skriv inn en gyldig e-postadresse');
      return false;
    }
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password.trim() && mode !== 'reset') {
      setFormError('Vennligst skriv inn passordet ditt');
      return false;
    }
    if (mode === 'signup') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!passwordRegex.test(password)) {
        setFormError('Passordet må inneholde minst 6 tegn, minst ett tall og én bokstav');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    let success = false;

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    setLoading(true);

    try {
      const from = (location.state as { from?: Location })?.from?.pathname || '/';

      if (mode === 'signin') {
        await signIn(email, password);
        success = true;
        navigate(from, { replace: true });
        toast({
          title: 'Innlogget',
          description: 'Du er nå logget inn.',
          duration: 2000
        });
      } else if (mode === 'signup') {
        await signUp(email, password);
        success = true;
        navigate('/auth/signin', { 
          state: { message: 'Registrering vellykket. Du kan nå logge inn.' }
        });
      } else if (mode === 'reset') {
        await resetPassword(email);
        success = true;
        navigate('/auth/signin', {
          state: { message: 'Sjekk e-posten din for instruksjoner om tilbakestilling av passord.' }
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      if (!success) {
        setFormError(
          mode === 'signin'
            ? 'Kunne ikke logge inn. Sjekk at e-post og passord er riktig.'
            : mode === 'signup'
            ? 'Kunne ikke opprette konto. Prøv igjen eller kontakt support.'
            : 'Kunne ikke tilbakestille passord. Prøv igjen senere.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    formError,
    handleSubmit
  };
}