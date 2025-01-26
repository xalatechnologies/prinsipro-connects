import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { HTMLMotionProps } from 'framer-motion';

interface StyledCardProps {
  variant?: 'default' | 'hover' | 'interactive';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  showGlowEffect?: boolean;
  showShadow?: boolean;
  motionProps?: HTMLMotionProps<'div'>;
}

export function StyledCard({ 
  variant = 'default', 
  children, 
  onClick, 
  className,
  showGlowEffect = true,
  showShadow = true,
  motionProps
}: StyledCardProps) {
  const baseStyles = "bg-white border border-gray-200 rounded-xl transition-all duration-200";
  const variantStyles = {
    default: "",
    hover: "hover:bg-gray-50 hover:border-gray-300",
    interactive: "hover:bg-gray-50 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg"
  };
  
  return (
    <motion.div
      whileHover={variant === 'interactive' ? { scale: 1.02, y: -4 } : undefined}
      className={cn(
        baseStyles,
        variantStyles[variant],
        showShadow && "shadow-sm",
        showGlowEffect && 'group',
        className
      )}
      onClick={onClick}
    >
      {showGlowEffect && (
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "bg-gradient-to-r from-transparent via-white/10 to-transparent",
          "transition-opacity duration-500 pointer-events-none",
          "rounded-xl"
        )} />
      )}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}