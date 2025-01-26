import React from 'react';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}

export function EmailInput({ value, onChange, error, disabled }: EmailInputProps) {
  return (
    <div>
      <label 
        htmlFor="email" 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        E-post
      </label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full pl-10 pr-4 py-2 border rounded-lg",
            error && "border-red-300",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          )}
          placeholder="din@epost.no"
          required
          disabled={disabled}
        />
      </div>
    </div>
  );
}