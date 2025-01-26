import React from 'react';
import { Area, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { AreasList } from '@/components/management/AreasList';
import { CategoriesList } from '@/components/management/CategoriesList';
import { PrinciplesList } from '@/components/management/PrinciplesList';

interface ManagementViewProps {
  areas: Area[];
  onAreaUpdate: (area: Area) => void;
  onAreaDelete: (areaId: string) => void;
  onAreaCreate: (area: Omit<Area, 'id'>) => void;
}

export function ManagementView({
  areas,
  onAreaUpdate,
  onAreaDelete,
  onAreaCreate
}: ManagementViewProps) {
  const [managementView, setManagementView] = React.useState<'areas' | 'categories' | 'principles' | null>(null);
  const [selectedArea, setSelectedArea] = React.useState<Area | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);

  if (!managementView) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Administrasjon</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Button
            onClick={() => setManagementView('areas')}
            className="h-auto p-6 bg-white hover:bg-gray-50 border border-gray-200"
          >
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">Områder</h3>
              <p className="text-sm text-gray-600">
                Administrer arkitekturområder og deres kategorier
              </p>
            </div>
          </Button>
          
          <Button
            onClick={() => setManagementView('categories')}
            className="h-auto p-6 bg-white hover:bg-gray-50 border border-gray-200"
            disabled={!selectedArea}
          >
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">Kategorier</h3>
              <p className="text-sm text-gray-600">
                {selectedArea 
                  ? `Administrer kategorier for ${selectedArea.name}`
                  : 'Velg først et område'}
              </p>
            </div>
          </Button>
          
          <Button
            onClick={() => setManagementView('principles')}
            className="h-auto p-6 bg-white hover:bg-gray-50 border border-gray-200"
            disabled={!selectedCategory}
          >
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">Prinsipper</h3>
              <p className="text-sm text-gray-600">
                {selectedCategory
                  ? `Administrer prinsipper for ${selectedCategory.name}`
                  : 'Velg først en kategori'}
              </p>
            </div>
          </Button>
        </div>
      </div>
    );
  }

  if (managementView === 'areas') {
    return (
      <AreasList
        areas={areas}
        onAreaSelect={(area) => {
          setSelectedArea(area);
          setManagementView('categories');
        }}
        onAreaUpdate={onAreaUpdate}
        onAreaDelete={onAreaDelete}
        onAreaCreate={onAreaCreate}
      />
    );
  }

  if (managementView === 'categories' && selectedArea) {
    return (
      <CategoriesList
        categories={selectedArea.categories}
        areaName={selectedArea.name}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          setManagementView('principles');
        }}
        onCategoryUpdate={(category) => {
          setSelectedArea(prev => prev ? {
            ...prev,
            categories: prev.categories.map(c => 
              c.id === category.id ? category : c
            )
          } : null);
        }}
        onCategoryDelete={(categoryId) => {
          setSelectedArea(prev => prev ? {
            ...prev,
            categories: prev.categories.filter(c => c.id !== categoryId)
          } : null);
        }}
        onCategoryCreate={(category) => {
          setSelectedArea(prev => prev ? {
            ...prev,
            categories: [...prev.categories, category]
          } : null);
        }}
        onBack={() => {
          setManagementView('areas');
          setSelectedArea(null);
        }}
      />
    );
  }

  if (managementView === 'principles' && selectedCategory) {
    return (
      <PrinciplesList
        principles={selectedCategory.principles}
        categoryName={selectedCategory.name}
        onPrincipleUpdate={(principle) => {
          setSelectedCategory(prev => prev ? {
            ...prev,
            principles: prev.principles.map(p => 
              p.id === principle.id ? principle : p
            )
          } : null);
        }}
        onPrincipleDelete={(principleId) => {
          setSelectedCategory(prev => prev ? {
            ...prev,
            principles: prev.principles.filter(p => p.id !== principleId)
          } : null);
        }}
        onPrincipleCreate={(principle) => {
          setSelectedCategory(prev => prev ? {
            ...prev,
            principles: [...prev.principles, principle]
          } : null);
        }}
        onBack={() => {
          setManagementView('categories');
          setSelectedCategory(null);
        }}
      />
    );
  }

  return null;
}