import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { CategoriesList } from '@/components/management/CategoriesList';
import { useDataService } from '@/hooks/useDataService';
import { Category } from '@/types';
import { toast } from '@/components/ui/toast';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function CategoriesPage() {
  const navigate = useNavigate();
  const dataService = useDataService();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        const areas = await dataService.getAreas();
        const allCategories = areas.flatMap(area => area.categories);
        setCategories(allCategories);
      } catch (error) {
        toast({
          title: 'Feil',
          description: 'Kunne ikke laste kategorier',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, [dataService]);

  const handleCategoryUpdate = async (category: Category) => {
    try {
      // In a real app, this would call an API
      setCategories(prev => prev.map(c => 
        c.id === category.id ? category : c
      ));
      toast({
        title: 'Oppdatert',
        description: 'Kategorien ble oppdatert'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke oppdatere kategorien',
        variant: 'destructive'
      });
    }
  };

  const handleCategoryDelete = async (categoryId: string) => {
    try {
      // In a real app, this would call an API
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      toast({
        title: 'Slettet',
        description: 'Kategorien ble slettet'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke slette kategorien',
        variant: 'destructive'
      });
    }
  };

  const handleCategoryCreate = async (category: Omit<Category, 'id'>) => {
    try {
      // In a real app, this would call an API
      const newCategory = {
        ...category,
        id: `category-${Date.now()}`,
        principles: []
      } as Category;
      setCategories(prev => [...prev, newCategory]);
      toast({
        title: 'Opprettet',
        description: 'Ny kategori ble opprettet'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke opprette kategorien',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner size="md" text="Laster kategorier..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <CategoriesList
        areaName="Alle områder"
        categories={categories}
        onCategoryUpdate={handleCategoryUpdate}
        onCategoryDelete={handleCategoryDelete}
        onCategoryCreate={handleCategoryCreate}
        onCategorySelect={() => {}}
        onBack={() => navigate('/admin')}
      />
    </AdminLayout>
  );
}