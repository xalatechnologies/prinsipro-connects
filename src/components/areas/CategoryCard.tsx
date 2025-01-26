import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { BookOpen, ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onSelect: () => void;
  viewMode: 'grid' | 'list';
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function CategoryCard({ category, onSelect, viewMode }: CategoryCardProps) {
  const Icon = category.style.icon || BookOpen;
  
  if (viewMode === 'list') {
    return (
      <motion.button
        variants={item}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSelect}
        className={cn(
          "w-full text-left p-4 rounded-lg",
          "bg-white hover:bg-gray-50",
          "border border-gray-200",
          "transition-all duration-200"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-gray-50">
            <Icon className="h-5 w-5 text-gray-600" />
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {category.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {category.principles.length > 0 && (
              <span className="text-sm font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                {category.principles.length} prinsipper
              </span>
            )}
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      variants={item}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "w-full p-6 rounded-xl",
        "bg-white hover:bg-gray-50",
        "border border-gray-200",
        "transition-all duration-200",
        "flex flex-col items-center text-center h-full"
      )}
    >
      <div className="p-4 rounded-xl bg-gray-50 mb-4">
        <Icon className="h-8 w-8 text-gray-600" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {category.name}
      </h3>

      <p className="text-sm text-gray-600 mb-6 line-clamp-3">
        {category.description}
      </p>

      {category.principles.length > 0 && (
        <div className="mt-auto">
          <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
            {category.principles.length} prinsipper
          </span>
        </div>
      )}
    </motion.button>
  );
}