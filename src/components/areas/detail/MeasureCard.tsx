import React from 'react';
import { motion } from 'framer-motion';
import { Measure } from '@types/index';
import { STATUS_ICONS } from '@config/constants';
import { getStatusIcon } from '@utils/status';

interface MeasureCardProps {
  measure: Measure;
}

export function MeasureCard({ measure }: MeasureCardProps) {
  const StatusIcon = getStatusIcon(measure.status);

  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.01 }}
      className="flex items-start gap-6 bg-white p-6 rounded-xl border border-gray-200 transition-shadow hover:shadow-md"
    >
      <div className="flex-shrink-0 mt-1">
        <StatusIcon className={`h-5 w-5 ${STATUS_ICONS[measure.status].color}`} />
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-2">
          <h6 className="text-lg font-medium text-gray-900">{measure.title}</h6>
          <span className={`text-sm px-3 py-1 rounded-full border ${STATUS_ICONS[measure.status].badgeColor}`}>
            {measure.status}
          </span>
        </div>
        <p className="text-base text-gray-600 mb-3">{measure.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">Ansvarlig:</span>
          <span>{measure.responsible}</span>
        </div>
      </div>
    </motion.div>
  );
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};