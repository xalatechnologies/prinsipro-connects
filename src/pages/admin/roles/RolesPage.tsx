import React from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { RoleManager } from '@/components/management/RoleManager';
import { useDataService } from '@/hooks/useDataService';
import { toast } from '@/components/ui/toast';

export function RolesPage() {
  const dataService = useDataService();
  const [roles, setRoles] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadRoles = async () => {
      try {
        // In real app, this would fetch from Supabase
        setRoles([]);
      } catch (error) {
        toast({
          title: 'Feil',
          description: 'Kunne ikke laste roller',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    loadRoles();
  }, []);

  const handleRoleCreate = async (roleData: any) => {
    try {
      // In real app, this would call Supabase
      toast({
        title: 'Opprettet',
        description: 'Ny rolle ble opprettet'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke opprette rolle',
        variant: 'destructive'
      });
    }
  };

  const handleRoleUpdate = async (roleData: any) => {
    try {
      // In real app, this would call Supabase
      toast({
        title: 'Oppdatert',
        description: 'Rolle ble oppdatert'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke oppdatere rolle',
        variant: 'destructive'
      });
    }
  };

  const handleRoleDelete = async (roleId: string) => {
    try {
      // In real app, this would call Supabase
      toast({
        title: 'Slettet',
        description: 'Rolle ble slettet'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke slette rolle',
        variant: 'destructive'
      });
    }
  };

  return (
    <AdminLayout>
      <RoleManager
        roles={roles}
        onRoleCreate={handleRoleCreate}
        onRoleUpdate={handleRoleUpdate}
        onRoleDelete={handleRoleDelete}
      />
    </AdminLayout>
  );
}