import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm text-gray-500", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
          {item.onClick || item.path ? (
            <button
              onClick={item.onClick}
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}