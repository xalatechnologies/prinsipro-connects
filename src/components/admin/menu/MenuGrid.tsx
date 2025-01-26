import React from 'react';
import { MenuItem } from './MenuItem';
import type { AdminMenuItem, AdminMenuCategory } from '@/types/admin';
import { cn } from '@/lib/utils';

interface MenuGridProps {
  items: AdminMenuItem[];
  onItemClick: (path: string) => void;
  view: 'grid' | 'list';
  filter?: AdminMenuCategory | 'all';
}

export function MenuGrid({ items, onItemClick, view, filter = 'all' }: MenuGridProps) {
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Ingen resultater funnet</p>
      </div>
    );
  }

  return (
    <div className={cn(
      view === 'grid'
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        : "space-y-4",
      "animate-in fade-in-50 duration-200"
    )}>
      {filteredItems.map((item) => (
        <MenuItem
          key={item.path}
          title={item.title}
          description={item.description}
          icon={item.icon}
          onClick={() => onItemClick(item.path)}
          view={view}
          category={item.category}
        />
      ))}
    </div>
  );
}