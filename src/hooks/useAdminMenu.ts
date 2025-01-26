import { useMemo } from 'react';
import { 
  BookOpen,
  FolderTree,
  FileText,
  Users,
  Shield,
  Activity,
  Bell,
  Settings
} from 'lucide-react';
import { AdminMenuItem } from '@/types/admin';

interface UseAdminMenuProps {
  userRole: 'admin' | 'editor' | 'viewer';
}

export function useAdminMenu({ userRole }: UseAdminMenuProps) {
  const menuItems = useMemo<AdminMenuItem[]>(() => [
    {
      title: 'Områder',
      description: 'Administrer arkitekturområder og deres kategorier',
      icon: BookOpen,
      path: '/admin/areas',
      category: 'content',
      roles: ['admin', 'editor']
    },
    {
      title: 'Kategorier',
      description: 'Administrer kategorier og deres prinsipper',
      icon: FolderTree,
      path: '/admin/categories',
      category: 'content',
      roles: ['admin', 'editor']
    },
    {
      title: 'Prinsipper',
      description: 'Administrer prinsipper og deres tiltak',
      icon: FileText,
      path: '/admin/principles',
      category: 'content',
      roles: ['admin', 'editor']
    },
    {
      title: 'Brukere',
      description: 'Administrer brukere og deres roller',
      icon: Users,
      path: '/admin/users',
      category: 'users',
      roles: ['admin']
    },
    {
      title: 'Roller',
      description: 'Definer roller og deres tilganger',
      icon: Shield,
      path: '/admin/roles',
      category: 'security',
      roles: ['admin']
    },
    {
      title: 'Aktivitet',
      description: 'Se aktivitetslogg og endringshistorikk',
      icon: Activity,
      path: '/admin/activity',
      category: 'system',
      roles: ['admin', 'editor']
    },
    {
      title: 'Varsler',
      description: 'Håndter systemvarsler og meldinger',
      icon: Bell,
      path: '/admin/notifications',
      category: 'system',
      roles: ['admin']
    },
    {
      title: 'Innstillinger',
      description: 'Konfigurer systeminnstillinger og preferanser',
      icon: Settings,
      path: '/admin/settings',
      category: 'system',
      roles: ['admin']
    }
  ], []);

  const filteredItems = useMemo(() => 
    menuItems.filter(item => item.roles.includes(userRole)),
    [menuItems, userRole]
  );

  return { menuItems: filteredItems };
}