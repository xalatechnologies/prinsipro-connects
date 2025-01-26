import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-2", className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
          <div
            className={cn(
              "flex items-center gap-1.5",
              item.onClick && "cursor-pointer hover:text-gray-900",
              !item.onClick && "text-gray-600"
            )}
            onClick={item.onClick}
          >
            {item.icon && (
              <span className="flex-shrink-0">{item.icon}</span>
            )}
            <span className="text-sm font-medium">
              {item.label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
}