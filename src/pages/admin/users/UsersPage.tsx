import React from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { UserManager } from '@/components/management/UserManager';
import { useDataService } from '@/hooks/useDataService';
import type { User } from '@/types/user';
import { toast } from '@/components/ui/toast';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function UsersPage() {
  const dataService = useDataService();
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadUsers = async () => {
      try {
        // In real app, this would fetch from Supabase
        setUsers([
          {
            id: 'user-1',
            name: 'Jan Johansen',
            email: 'jan.johansen@nordrefollo.kommune.no',
            role: 'admin',
            status: 'active',
            lastLogin: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]);
      } catch (error) {
        toast({
          title: 'Feil',
          description: 'Kunne ikke laste brukere',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleUserCreate = async (user: Omit<User, 'id'>) => {
    try {
      // In real app, this would call Supabase
      const newUser = {
        ...user,
        id: `user-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUsers(prev => [...prev, newUser]);
      toast({
        title: 'Opprettet',
        description: 'Ny bruker ble opprettet'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke opprette bruker',
        variant: 'destructive'
      });
    }
  };

  const handleUserUpdate = async (user: User) => {
    try {
      // In real app, this would call Supabase
      setUsers(prev => prev.map(u => u.id === user.id ? {
        ...user,
        updatedAt: new Date().toISOString()
      } : u));
      toast({
        title: 'Oppdatert',
        description: 'Bruker ble oppdatert'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke oppdatere bruker',
        variant: 'destructive'
      });
    }
  };

  const handleUserDelete = async (userId: string) => {
    try {
      // In real app, this would call Supabase
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast({
        title: 'Slettet',
        description: 'Bruker ble slettet'
      });
    } catch (error) {
      toast({
        title: 'Feil',
        description: 'Kunne ikke slette bruker',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner size="md" text="Laster brukere..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <UserManager
        users={users}
        onUserCreate={handleUserCreate}
        onUserUpdate={handleUserUpdate}
        onUserDelete={handleUserDelete}
      />
    </AdminLayout>
  );
}