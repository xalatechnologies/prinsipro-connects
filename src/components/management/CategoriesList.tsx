import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, MoreVertical, Filter, Grid2X2, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StyledCard } from '@/components/ui/StyledCard';
import { CategoryForm } from './CategoryForm';
import { ConfirmDialog } from './ConfirmDialog';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface CategoriesListProps {
  categories: Category[];
  areaName: string;
  onCategorySelect?: (category: Category) => void;
  onCategoryUpdate: (category: Category) => void;
  onCategoryDelete: (categoryId: string) => void;
  onCategoryCreate: (category: Omit<Category, 'id' | 'principles' | 'guidelines' | 'style'> & { style: CategoryStyle }) => void;
  onBack: () => void;
}

export function CategoriesList({
  categories, 
  areaName,
  onCategorySelect,
  onCategoryUpdate, 
  onCategoryDelete, 
  onCategoryCreate,
  onBack
}: CategoriesListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (categoryId: string) => {
    if (deletingCategoryId) {
      await onCategoryDelete(categoryId);
      setDeletingCategoryId(null);
    }
  };

  const handleFormSubmit = async (formData: Omit<Category, 'id' | 'principles' | 'guidelines' | 'style'> & { style: CategoryStyle }) => {
    if (editingCategory) {
      await onCategoryUpdate({ 
        ...editingCategory,
        name: formData.name,
        description: formData.description,
        area_id: formData.area_id,
        style: formData.style
      });
    } else {
      await onCategoryCreate(formData);
    }
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-200">
        <div className="px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb
            className="mb-6"
            items={[
              { label: 'Administrasjonspanel', path: '/admin' },
              { label: 'Områder', path: '/admin/areas', onClick: onBack },
              { label: areaName }
            ]}
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Kategorier for {areaName}
              </h1>
              <p className="text-gray-600">
                Administrer kategorier og deres prinsipper
              </p>
            </div>

            <div className="flex items-center gap-3">
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
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-[#003057] hover:bg-[#002543]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ny kategori
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-8 py-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>Filter:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border-0 bg-transparent font-medium text-gray-900 focus:outline-none focus:ring-0"
              >
                <option value="all">Alle kategorier</option>
                <option value="active">Med aktive prinsipper</option>
                <option value="empty">Uten prinsipper</option>
              </select>
            </div>

            <div className="flex-grow" />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{categories.length} kategorier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid/List */}
      <div className={cn(
        "bg-white rounded-b-xl border border-gray-200 p-8",
        "border-t-0 -mt-6"
      )}>
        <div className={cn(
          viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        )}>
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {viewMode === 'list' ? (
                <StyledCard
                  variant="hover"
                  className="flex items-center gap-4"
                >
                  <div className="flex-grow min-w-0">
                    <button
                      onClick={() => onCategorySelect?.(category)}
                      className="flex items-center gap-3 mb-2 hover:text-[#003057] transition-colors w-full text-left"
                    >
                      <div className="p-2.5 rounded-lg bg-gray-50">
                        <category.style.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {category.name}
                      </h3>
                    </button>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingCategoryId(category.id)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </StyledCard>
              ) : (
                <StyledCard
                  variant="interactive"
                  className="h-[280px] flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-gray-50">
                        <category.style.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-gray-600 flex-grow line-clamp-3">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">
                      {category.principles.length} prinsipper
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingCategoryId(category.id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </StyledCard>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Form Modal */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deletingCategoryId && (
        <ConfirmDialog
          title="Slett kategori"
          message="Er du sikker på at du vil slette denne kategorien? Alle tilhørende prinsipper vil også bli slettet. Denne handlingen kan ikke angres."
          confirmLabel="Slett"
          cancelLabel="Avbryt"
          onConfirm={() => handleDelete(deletingCategoryId)}
          onCancel={() => setDeletingCategoryId(null)}
          variant="destructive"
        />
      )}
    </div>
  );
}
