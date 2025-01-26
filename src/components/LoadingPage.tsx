import React from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function LoadingPage() {
  return (
    <LoadingSpinner 
      size="lg"
      fullScreen
      text="Laster inn siden..."
    />
  );
}