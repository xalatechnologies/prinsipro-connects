import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthForm } from '@/components/auth/AuthForm';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from '@/components/ui/toast';

export function SignIn() {
  const location = useLocation();
  const message = (location.state as { message?: string })?.message;

  useEffect(() => {
    if (message) {
      toast({
        title: 'Info',
        description: message,
        duration: 5000
      });
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [message]);

  return (
    <AuthLayout
      title="Velkommen tilbake"
      description="Logg inn på din konto"
    >
      <AuthForm mode="signin" />
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Eller
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-center">
          <Link
            to="/auth/signup"
            className="font-medium text-[#003057] hover:text-[#002543]"
          >
            Registrer ny konto
          </Link>
          <Link
            to="/auth/reset-password"
            className="font-medium text-[#003057] hover:text-[#002543]"
          >
            Glemt passord?
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}