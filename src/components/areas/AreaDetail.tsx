import React from 'react';
import { motion } from 'framer-motion';
import { Area } from '@types/index';
import { AreaDetailHeader } from '@components/areas/detail/AreaDetailHeader';
import { CategorySection } from '@components/areas/detail/CategorySection';

interface AreaDetailProps {
  area: Area;
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

export function AreaDetail({ area }: AreaDetailProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-12"
    >
      <AreaDetailHeader area={area} />
      <motion.div variants={container} className="grid gap-12">
        {area.categories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </motion.div>
    </motion.div>
  );
}