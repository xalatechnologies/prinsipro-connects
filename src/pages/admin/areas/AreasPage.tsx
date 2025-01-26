import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { AreasList } from '@/components/management/AreasList';
import { useDataService } from '@/hooks/useDataService';
import { Area } from '@/types';
import { toast } from '@/components/ui/toast';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function AreasPage() {
  const navigate = useNavigate();
  const dataService = useDataService();
  const [areas, setAreas] = React.useState<Area[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadAreas = async () => {
      try {
        const loadedAreas = await dataService.getAreas();
        setAreas(loadedAreas);
      } catch (error) {
        toast({
          title: 'Feil',
          description: 'Kunne ikke laste områder',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    loadAreas();
  }, [dataService]);

  const handleAreaUpdate = async (area: Area) => {
    try {
      // In a real app, this would call an API
      setAreas(prev => prev.map(a => a.id === area.id ? area : a));
      toast({
        title: 'Oppdatert',
        description: 'Området ble oppdatert'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke oppdatere området',
        variant: 'destructive'
      });
    }
  };

  const handleAreaDelete = async (areaId: string) => {
    try {
      // In a real app, this would call an API
      setAreas(prev => prev.filter(a => a.id !== areaId));
      toast({
        title: 'Slettet',
        description: 'Området ble slettet'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke slette området',
        variant: 'destructive'
      });
    }
  };

  const handleAreaCreate = async (area: Omit<Area, 'id'>) => {
    try {
      // In a real app, this would call an API
      const newArea = {
        ...area,
        id: `area-${Date.now()}`,
        categories: [],
        useCases: []
      } as Area;
      setAreas(prev => [...prev, newArea]);
      toast({
        title: 'Opprettet',
        description: 'Nytt område ble opprettet'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke opprette området',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner size="md" text="Laster områder..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AreasList
        areas={areas}
        onAreaUpdate={handleAreaUpdate}
        onAreaDelete={handleAreaDelete}
        onAreaCreate={handleAreaCreate}
      />
    </AdminLayout>
  );
}