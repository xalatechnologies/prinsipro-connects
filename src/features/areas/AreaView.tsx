import React from 'react';
import { Area, Category } from '@/types';
import { AreaOverview } from '@/components/areas/AreaOverview';
import { CategoryOverview } from '@/components/areas/CategoryOverview';
import { AreaDetail } from '@/components/areas/detail/AreaDetail';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface AreaViewProps {
  areas: Area[];
  selectedArea: string | null;
  selectedCategory: string | null;
  onAreaSelect: (areaId: string) => void;
  onCategorySelect: (categoryId: string) => void;
}

export function AreaView({
  areas,
  selectedArea,
  selectedCategory,
  onAreaSelect,
  onCategorySelect
}: AreaViewProps) {
  const currentArea = areas.find(area => area.id === selectedArea);
  const currentCategory = currentArea?.categories.find(cat => cat.id === selectedCategory);

  if (!selectedArea) {
    return (
      <div data-tour="areas">
        <AreaOverview areas={areas} onAreaSelect={onAreaSelect} />
      </div>
    );
  }

  if (!selectedCategory && currentArea) {
    return (
      <CategoryOverview
        areaName={currentArea.name}
        categories={currentArea.categories}
        responsible={currentArea.responsible}
        createdAt={currentArea.created_at}
        onCategorySelect={onCategorySelect}
        onBack={() => onAreaSelect(null)}
      />
    );
  }

  if (currentArea && currentCategory) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <Button
          variant="ghost"
          onClick={() => onCategorySelect(null)}
          className="mb-8 text-gray-600 hover:text-gray-900 flex items-center gap-2 -ml-2"
        >
          ← Tilbake til kategorier
        </Button>
        <AreaDetail area={currentArea} category={currentCategory} />
      </motion.div>
    );
  }

  return null;
}