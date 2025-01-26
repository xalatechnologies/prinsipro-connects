import React from 'react';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  mode: 'signin' | 'signup';
  showForgotPassword?: boolean;
}

export function PasswordInput({ 
  value, 
  onChange, 
  error, 
  disabled, 
  mode,
  showForgotPassword 
}: PasswordInputProps) {
  return (
    <div>
      <label 
        htmlFor="password" 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Passord
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          id="password"
          type="password"
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full pl-10 pr-4 py-2 border rounded-lg",
            error && "border-red-300",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          )}
          placeholder="••••••••"
          required
          minLength={6}
          disabled={disabled}
        />
      </div>
      {mode === 'signup' && (
        <p className="mt-2 text-sm text-gray-500">
          Passordet må være minst 6 tegn langt
        </p>
      )}
      {showForgotPassword && mode === 'signin' && (
        <div className="mt-2 text-sm text-right">
          <Link
            to="/auth/reset-password"
            className="text-[#003057] hover:text-[#002543]"
          >
            Glemt passord?
          </Link>
        </div>
      )}
    </div>
  );
}