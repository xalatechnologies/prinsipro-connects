import React from 'react';
import { EmailInput } from './form/EmailInput';
import { PasswordInput } from './form/PasswordInput';
import { FormError } from './form/FormError';
import { SubmitButton } from './form/SubmitButton';
import { useAuthForm } from '@/hooks/useAuthForm';

interface AuthFormProps {
  mode: 'signin' | 'signup' | 'reset';
}

export function AuthForm({ mode }: AuthFormProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    formError,
    handleSubmit
  } = useAuthForm({ mode });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormError message={formError || ''} />
      
      <EmailInput
        value={email}
        onChange={setEmail}
        error={!!formError && !email.trim()}
        disabled={loading}
      />

      {mode !== 'reset' && (
        <PasswordInput
          value={password}
          onChange={setPassword}
          error={!!formError && !password.trim()}
          disabled={loading}
          mode={mode}
          showForgotPassword={mode === 'signin'}
        />
      )}

      <SubmitButton loading={loading} mode={mode} />
    </form>
  );
}