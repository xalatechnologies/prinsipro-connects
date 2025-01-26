import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TourButtonProps {
  onClick: () => void;
}

export const TourButton: React.FC<TourButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "fixed p-2 bg-white text-gray-700 rounded-full shadow-lg",
        "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        "transition-all duration-200 ease-in-out",
        // Responsive positioning
        "bottom-20 left-4 sm:bottom-6 sm:left-6",
        // Responsive sizing
        "h-10 w-10 sm:h-12 sm:w-12",
        // Z-index to ensure it's above content but below modals
        "z-40",
        // Hide when printing
        "print:hidden"
      )}
      title="Start omvisning"
    >
      <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="sr-only">Start omvisning</span>
    </Button>
  );
};