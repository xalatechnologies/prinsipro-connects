import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { PrinciplesList } from '@/components/management/PrinciplesList';
import { useDataService } from '@/hooks/useDataService';
import { Principle } from '@/types';
import { toast } from '@/components/ui/toast';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function PrinciplesPage() {
  const navigate = useNavigate();
  const dataService = useDataService();
  const [principles, setPrinciples] = React.useState<Principle[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPrinciples = async () => {
      try {
        const areas = await dataService.getAreas();
        const allPrinciples = areas.flatMap(area => 
          area.categories.flatMap(category => category.principles)
        );
        setPrinciples(allPrinciples);
      } catch (error) {
        toast({
          title: 'Feil',
          description: 'Kunne ikke laste prinsipper',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    loadPrinciples();
  }, [dataService]);

  const handlePrincipleUpdate = async (principle: Principle) => {
    try {
      // In a real app, this would call an API
      setPrinciples(prev => prev.map(p => 
        p.id === principle.id ? principle : p
      ));
      toast({
        title: 'Oppdatert',
        description: 'Prinsippet ble oppdatert'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke oppdatere prinsippet',
        variant: 'destructive'
      });
    }
  };

  const handlePrincipleDelete = async (principleId: string) => {
    try {
      // In a real app, this would call an API
      setPrinciples(prev => prev.filter(p => p.id !== principleId));
      toast({
        title: 'Slettet',
        description: 'Prinsippet ble slettet'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke slette prinsippet',
        variant: 'destructive'
      });
    }
  };

  const handlePrincipleCreate = async (principle: Omit<Principle, 'id'>) => {
    try {
      // In a real app, this would call an API
      const newPrinciple = {
        ...principle,
        id: `principle-${Date.now()}`,
        measures: []
      } as Principle;
      setPrinciples(prev => [...prev, newPrinciple]);
      toast({
        title: 'Opprettet',
        description: 'Nytt prinsipp ble opprettet'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke opprette prinsippet',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner size="md" text="Laster prinsipper..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PrinciplesList
        categoryName="Alle kategorier"
        principles={principles}
        onPrincipleUpdate={handlePrincipleUpdate}
        onPrincipleDelete={handlePrincipleDelete}
        onPrincipleCreate={handlePrincipleCreate}
        onPrincipleSelect={() => {}}
        onBack={() => navigate('/admin')}
      />
    </AdminLayout>
  );
}