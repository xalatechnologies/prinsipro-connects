import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '@/types';
import { CategoryCard } from './CategoryCard';
import { Button } from '@/components/ui/button';
import { BookOpen, User, Calendar, ArrowLeft, Info, Filter, Grid2X2, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryOverviewProps {
  areaName: string;
  categories: Category[];
  responsible: string;
  createdAt: string;
  onCategorySelect: (categoryId: string) => void;
  onBack: () => void;
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

export function CategoryOverview({ 
  areaName, 
  categories, 
  responsible,
  createdAt,
  onCategorySelect, 
  onBack 
}: CategoryOverviewProps) {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = React.useState('all');

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-6"
    >
      {/* Modern Header */}
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-200">
        <div className="px-8 py-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-gray-600 hover:text-gray-900 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tilbake til områder
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="p-4 rounded-xl bg-[#003057] text-white">
                <BookOpen className="h-8 w-8" />
              </div>
            </div>
            
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{areaName}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Ansvarlig: <span className="font-medium">{responsible}</span></span>
                </div>
                <div className="hidden sm:block text-gray-300">•</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Opprettet: <span className="font-medium">{new Date(createdAt).toLocaleDateString('nb-NO')}</span></span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={cn(
                  "px-3",
                  viewMode === 'grid' && "bg-gray-100"
                )}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={cn(
                  "px-3",
                  viewMode === 'list' && "bg-gray-100"
                )}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-8 py-4 border-t border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            <span>Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border-0 bg-transparent font-medium text-gray-900 focus:outline-none focus:ring-0"
            >
              <option value="all">Alle kategorier</option>
              <option value="active">Aktive prinsipper</option>
              <option value="draft">Under arbeid</option>
            </select>
          </div>

          <div className="flex-grow" />

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{categories.length} kategorier</span>
          </div>
        </div>
      </div>

      {/* Categories Grid/List */}
      <div className={cn(
        "bg-white rounded-b-xl border border-gray-200 p-8",
        "border-t-0 -mt-6" // Connect with header
      )}>
        {categories.length > 0 ? (
          <motion.div 
            variants={container}
            className={cn(
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            )}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onSelect={() => onCategorySelect(category.id)}
                viewMode={viewMode}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen kategorier funnet</h3>
            <p className="text-gray-600">Det er ikke definert noen kategorier for dette området ennå.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}