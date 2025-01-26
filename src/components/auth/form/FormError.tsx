import React from 'react';

interface FormErrorProps {
  message: string;
}

export function FormError({ message }: FormErrorProps) {
  return message ? (
    <div className="p-3 rounded-lg bg-red-50 text-red-900 text-sm">
      {message}
    </div>
  ) : null;
}