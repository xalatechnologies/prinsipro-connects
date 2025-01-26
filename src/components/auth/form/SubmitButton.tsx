import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  loading: boolean;
  mode: 'signin' | 'signup' | 'reset';
}

export function SubmitButton({ loading, mode }: SubmitButtonProps) {
  const getButtonText = () => {
    if (loading) return <Loader2 className="h-5 w-5 animate-spin" />;
    switch (mode) {
      case 'signin': return 'Logg inn';
      case 'signup': return 'Registrer deg';
      case 'reset': return 'Tilbakestill passord';
    }
  };

  return (
    <Button
      type="submit"
      disabled={loading}
      className="w-full bg-[#003057] hover:bg-[#002543] text-white"
    >
      {getButtonText()}
    </Button>
  );
}