import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import type { AdminMenuCategory } from '@/types/admin';

interface MenuItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  view: 'grid' | 'list';
  category?: AdminMenuCategory;
}

export function MenuItem({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  view, 
  category 
}: MenuItemProps) {
  if (view === 'list') {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "w-full text-left p-4 rounded-lg",
          "bg-white hover:bg-gray-50",
          "border border-gray-200",
          "transition-all duration-200"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-gray-50">
            <Icon className="h-5 w-5 text-gray-600" />
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full h-full p-6 bg-white rounded-lg border border-gray-200",
        "hover:bg-gray-50 hover:border-gray-300",
        "transition-all duration-200",
        "flex flex-col items-center text-center"
      )}
    >
      <div className="p-3 rounded-xl bg-gray-100 mb-4">
        <Icon className="h-6 w-6 text-gray-600" />
      </div>
      <div className="flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {description}
        </p>
      </div>
    </motion.button>
  );
}