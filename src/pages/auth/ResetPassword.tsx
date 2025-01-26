import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthForm } from '@/components/auth/AuthForm';
import { Link } from 'react-router-dom';

export function ResetPassword() {
  return (
    <AuthLayout
      title="Tilbakestill passord"
      description="Skriv inn e-postadressen din for å tilbakestille passordet"
    >
      <AuthForm mode="reset" />
      
      <div className="mt-6 text-center">
        <Link
          to="/auth/signin"
          className="text-sm font-medium text-[#003057] hover:text-[#002543]"
        >
          Tilbake til innlogging
        </Link>
      </div>
    </AuthLayout>
  );
}