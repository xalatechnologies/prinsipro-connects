import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center space-x-2', className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
          <button
            onClick={item.onClick}
            className={cn(
              'flex items-center gap-2 text-sm',
              item.onClick ? 'hover:text-[#003057] cursor-pointer' : 'cursor-default',
              index === items.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-600'
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
}