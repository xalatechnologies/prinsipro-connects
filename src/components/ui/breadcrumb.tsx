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
    <nav className={cn("flex items-center space-x-1 text-sm text-gray-500", className)}>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
          {item.href ? (
            <a
              href={item.href}
              className="hover:text-gray-700 hover:underline"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}