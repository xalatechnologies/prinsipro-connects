import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '@types/index';
import { PrincipleList } from './PrincipleList';
import { GuidelineList } from './GuidelineList';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, User, Calendar, Filter, Info, Layers, BookOpenCheck } from 'lucide-react';

interface CategorySectionProps {
  category: Category;
  onBack: () => void;
  areaName: string;
  responsible: string;
  createdAt: string;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function CategorySection({ category, onBack, areaName, responsible, createdAt }: CategorySectionProps) {
  const [activeTab, setActiveTab] = React.useState<string>(category.style.tabs[0].id);
  const Icon = category.style.icon;

  return (
    <motion.div
      variants={item}
      className="space-y-6"
    >
      {activeTab === 'principles' ? (
        <PrincipleList 
          principles={category.principles}
          onBack={onBack}
          categoryName={category.name}
          categoryDescription={category.description}
          categoryIcon={Icon}
        />
      ) : (
        <GuidelineList 
          guidelines={category.guidelines}
          onBack={onBack}
          categoryName={category.name}
          categoryDescription={category.description}
        />
      )}
    </motion.div>
  );
}