import React from 'react';
import { motion } from 'framer-motion';
import { Area, Category } from '@types/index';
import { PrincipleList } from './PrincipleList';

interface AreaDetailProps {
  area: Area;
  category: Category;
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

export function AreaDetail({ area, category }: AreaDetailProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-12"
    >
      <motion.div variants={container} className="space-y-12">
        {category.principles.length > 0 ? (
          <PrincipleList principles={category.principles} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Ingen prinsipper er definert for denne kategorien ennå.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}