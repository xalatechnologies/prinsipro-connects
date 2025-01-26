import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm", className)}>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
          <span
            className={cn(
              "text-gray-600 hover:text-gray-900 transition-colors",
              index === items.length - 1 && "font-medium text-gray-900"
            )}
          >
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}