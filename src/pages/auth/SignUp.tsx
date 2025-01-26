import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthForm } from '@/components/auth/AuthForm';
import { Link } from 'react-router-dom';

export function SignUp() {
  return (
    <AuthLayout
      title="Opprett konto"
      description="Registrer deg for å få tilgang"
    >
      <AuthForm mode="signup" />
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Har du allerede en konto?{' '}
          <Link
            to="/auth/signin"
            className="font-medium text-[#003057] hover:text-[#002543]"
          >
            Logg inn her
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}