import React from 'react';
import { motion } from 'framer-motion';
import { Area } from '@/types';
import { Calendar, User, Info } from 'lucide-react';

interface AreaDetailHeaderProps {
  area: Area;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function AreaDetailHeader({ area }: AreaDetailHeaderProps) {
  const Icon = area.style.icon;

  return (
    <motion.div 
      variants={item} 
      className="border-b border-gray-200 pb-6 sm:pb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className={`p-3 sm:p-4 rounded-xl ${area.style.bgColor} self-start`}>
          <Icon className={`h-8 sm:h-12 w-8 sm:w-12 ${area.style.iconColor}`} />
        </div>
        <div>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">{area.name}</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Ansvarlig: <span className="font-medium">{area.responsible}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Opprettet: <span className="font-medium">{new Date(area.created_at).toLocaleDateString('nb-NO')}</span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mt-4 sm:mt-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
          <p className="text-base sm:text-xl text-gray-600">{area.description}</p>
        </div>
      </div>
    </motion.div>
  );
}