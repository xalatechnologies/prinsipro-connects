import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function DashboardSearch({ value, onChange }: DashboardSearchProps) {
  return (
    <div className="relative flex-grow max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Søk i administrasjonspanelet..."
        className={cn(
          "w-full pl-10 pr-4 py-2 rounded-lg",
          "border border-gray-300",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "placeholder-gray-400 text-gray-900"
        )}
      />
    </div>
  );
}