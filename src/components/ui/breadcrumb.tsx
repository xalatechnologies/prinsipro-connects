import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <div className={cn("flex items-center gap-2 text-sm text-gray-500", className)}>
      <button 
        onClick={() => navigate('/')}
        className="hover:text-gray-900 transition-colors flex items-center gap-2"
      >
        <Home className="h-4 w-4" />
        <span>Nordre Follo kommune</span>
      </button>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
          ) : (
            <button
              onClick={() => item.onClick ? item.onClick() : item.path && navigate(item.path)}
              className="hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              {item.icon}
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}