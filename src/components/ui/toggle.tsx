import React from 'react';
import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggle({ checked, onChange, disabled, className }: ToggleProps) {
  return (
    <label className={cn(
      "relative inline-flex items-center cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <div className={cn(
        "w-11 h-6 bg-gray-200 rounded-full peer",
        "peer-checked:after:translate-x-full peer-checked:after:border-white",
        "after:content-[''] after:absolute after:top-0.5 after:left-[2px]",
        "after:bg-white after:border-gray-300 after:border after:rounded-full",
        "after:h-5 after:w-5 after:transition-all",
        "peer-checked:bg-[#003057]"
      )}></div>
    </label>
  );
}