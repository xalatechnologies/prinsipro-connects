import React from 'react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-10 h-10 rounded-lg border border-gray-200",
            "cursor-pointer appearance-none",
            "focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
        />
        <div 
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{ backgroundColor: value }}
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "px-3 py-1.5 rounded-lg",
          "border border-gray-200",
          "text-sm font-mono",
          "focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
      />
    </div>
  );
}