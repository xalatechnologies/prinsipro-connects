import React from 'react';
import { motion } from 'framer-motion';
import { Measure } from '@/types';
import { MeasureCard } from './MeasureCard';

interface MeasureListProps {
  measures: Measure[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function MeasureList({ measures }: MeasureListProps) {
  return (
    <motion.div
      variants={container}
      className="mt-6 bg-gray-50 rounded-xl p-6"
    >
      <h5 className="text-base font-medium text-gray-900 mb-4">Tiltak og status</h5>
      <div className="space-y-4">
        {measures.map((measure) => (
          <MeasureCard key={measure.id} measure={measure} />
        ))}
      </div>
    </motion.div>
  );
}