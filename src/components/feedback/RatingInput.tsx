import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { feedbackStyle } from '@/data/feedback/mockFeedback';
import { toast } from '@/components/ui/toast';

const ratingLabels = {
  1: 'Svært misfornøyd',
  2: 'Misfornøyd',
  3: 'Nøytral',
  4: 'Fornøyd',
  5: 'Svært fornøyd'
};

interface RatingInputProps {
  initialValue: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function RatingInput({ initialValue, onChange, disabled = false }: RatingInputProps) {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSetRating = async (value: number) => {
    if (disabled || isSubmitting) return;

    setIsSubmitting(true);
    try {
      setRating(value);
      await onChange(value);
      toast({
        title: "Vurdering registrert",
        description: "Takk for din tilbakemelding!",
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Kunne ikke registrere vurdering",
        description: "Prøv igjen senere.",
        variant: "destructive",
        duration: 5000
      });
      // Reset rating on error
      setRating(initialValue);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <motion.button
            key={value}
            whileHover={{ scale: disabled ? 1 : 1.1 }}
            whileTap={{ scale: disabled ? 1 : 0.9 }}
            onClick={() => handleSetRating(value)}
            onMouseEnter={() => !disabled && setHover(value)}
            onMouseLeave={() => !disabled && setHover(0)}
            disabled={disabled || isSubmitting}
            className={cn(
              "p-1 rounded-full transition-all",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <Star
              className={cn(
                "h-8 w-8 transition-colors",
                (hover || rating) >= value
                  ? feedbackStyle.ratingColors[value as keyof typeof feedbackStyle.ratingColors]
                  : "text-gray-300"
              )}
              fill={(hover || rating) >= value ? "currentColor" : "none"}
            />
          </motion.button>
        ))}
      </div>

      <div className="h-6">
        {isSubmitting ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-600"
          >
            Registrerer vurdering...
          </motion.p>
        ) : (hover || rating) > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-600"
          >
            {ratingLabels[hover || rating as keyof typeof ratingLabels]}
          </motion.p>
        )}
      </div>
    </div>
  );
}