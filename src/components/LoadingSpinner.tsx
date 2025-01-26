import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  fullScreen?: boolean;
  motionProps?: HTMLMotionProps<'div'>;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
} satisfies Record<NonNullable<LoadingSpinnerProps['size']>, string>;

export function LoadingSpinner({ 
  size = 'md', 
  text, 
  className, 
  fullScreen,
  motionProps
}: LoadingSpinnerProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center",
      fullScreen && "min-h-screen",
      className
    )}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity,
          ease: "linear"
        }}
        {...motionProps}
      >
        <Loader2 className={cn(
          sizeClasses[size],
          "text-[#003057]"
        )} />
      </motion.div>
      {text && (
        <p className="mt-2 text-gray-600">{text}</p>
      )}
    </div>
  );
}