import React from 'react';
import { Filter, Grid2X2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DashboardFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function DashboardFilters({
  activeFilter,
  onFilterChange,
  view,
  onViewChange
}: DashboardFiltersProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-400" />
        <select
          value={activeFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className={cn(
            "border-0 bg-transparent font-medium text-gray-900 pr-8",
            "focus:outline-none focus:ring-0",
            "cursor-pointer appearance-none"
          )}
        >
          <option value="all">Alle kategorier</option>
          <option value="content">Innhold</option>
          <option value="users">Brukere</option>
          <option value="security">Sikkerhet</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewChange('grid')}
          className={cn(
            "h-8 w-8",
            view === 'grid' 
              ? "bg-gray-100 text-gray-900" 
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewChange('list')}
          className={cn(
            "h-8 w-8",
            view === 'list' 
              ? "bg-gray-100 text-gray-900" 
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}