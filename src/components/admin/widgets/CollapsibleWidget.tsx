import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleWidgetProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export function CollapsibleWidget({ 
  title, 
  icon, 
  children,
  defaultCollapsed
}: CollapsibleWidgetProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="bg-white rounded-xl border border-gray-200 card-shadow">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 mt-0.5">
          {icon}
          <h2 className="text-lg mt-4 font-semibold text-gray-900">{title}</h2>
        </div>
        <ChevronDown 
          className={cn(
            "h-5 w-5 text-gray-400 transition-transform duration-200",
            !isCollapsed && "transform rotate-180"
          )} 
        />
      </button>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-5 border-t border-gray-200">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}