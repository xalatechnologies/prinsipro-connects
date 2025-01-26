import React from 'react';
import { motion } from 'framer-motion';
import type { Area, Stats } from '@/types';
import { cn } from '@/lib/utils';
import { MessageSquare, ThumbsUp, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface AreaCardProps {
  area: Area;
  onSelect: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  stats: Stats;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function AreaCard({ area, onSelect, onEdit, onDelete, stats }: AreaCardProps) {
  const Icon = area.style.icon;
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full h-full p-6 bg-white rounded-lg border border-gray-200",
        "hover:bg-gray-50 hover:scale-[1.02] hover:-translate-y-1",
        "transition-all duration-200",
        "flex flex-col items-center text-center"
      )}
    >
        {/* Admin Actions */}
        {isAdmin && (
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="text-gray-600 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className={cn(
          "p-6 rounded-2xl mb-6 relative",
          "bg-gradient-to-br from-gray-50/50 to-transparent",
          "border border-gray-100/50",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
          "transition-transform duration-500",
          "group-hover:scale-110 group-hover:rotate-3",
          "after:absolute after:inset-0 after:rounded-2xl",
          "after:bg-gradient-to-t after:from-white/10 after:to-transparent",
          "after:opacity-0 after:transition-opacity after:duration-300",
          "group-hover:after:opacity-100"
        )}>
          <Icon className={cn(
            "h-12 w-12",
            area.style.iconColor,
            "transition-transform duration-500",
            "group-hover:scale-110 group-hover:rotate-6",
            "drop-shadow-[0_2px_3px_rgba(0,0,0,0.1)]"
          )} />
        </div>

        <h3 className={cn(
          "text-xl font-bold tracking-tight mb-3",
          "bg-clip-text text-transparent bg-gradient-to-br",
          "from-gray-900 via-gray-800 to-gray-700",
          "transition-colors duration-300"
        )}>
          {area.name}
        </h3>

        <p className={cn(
          "text-base font-normal leading-relaxed mb-6",
          "text-gray-600/95",
          "tracking-wide",
          "transition-colors duration-300"
        )}>
          {area.description}
        </p>
        {/* Stats */}
        {stats && (
          <div className="flex items-center gap-4 mt-2 mb-4">
            <div className="flex items-center gap-1.5 text-gray-600">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-sm">{stats.likes}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">{stats.comments}</span>
            </div>
          </div>
        )}

        {area.categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-auto">
            {area.categories.map(category => (
              <span 
                key={category.id}
                className={cn(
                  "text-xs font-medium px-3 py-1.5 rounded-full",
                  "bg-gradient-to-br from-gray-50/90 to-white/60",
                  "text-gray-700/90",
                  "border border-gray-200/40",
                  "shadow-[0_2px_4px_rgba(0,0,0,0.02)]",
                  "transition-all duration-300",
                  "hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:scale-105",
                  "hover:border-gray-300/60",
                  "backdrop-blur-sm"
                )}
              >
                {category.name}
              </span>
            ))}
          </div>
        )}
    </button>
  );
}