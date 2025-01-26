import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BookOpen,
  FolderTree,
  FileText,
  Shield,
  Activity,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardProps {
  userRole: 'admin' | 'editor' | 'viewer';
}

export function Dashboard({ userRole }: DashboardProps) {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Områder',
      description: 'Administrer arkitekturområder',
      icon: BookOpen,
      path: '/admin/areas',
      roles: ['admin', 'editor']
    },
    {
      title: 'Kategorier',
      description: 'Administrer kategorier',
      icon: FolderTree,
      path: '/admin/categories',
      roles: ['admin', 'editor']
    },
    {
      title: 'Prinsipper',
      description: 'Administrer prinsipper',
      icon: FileText,
      path: '/admin/principles',
      roles: ['admin', 'editor']
    },
    {
      title: 'Brukere',
      description: 'Administrer brukertilgang',
      icon: Users,
      path: '/admin/users',
      roles: ['admin']
    },
    {
      title: 'Roller',
      description: 'Administrer roller og tilganger',
      icon: Shield,
      path: '/admin/roles',
      roles: ['admin']
    },
    {
      title: 'Aktivitet',
      description: 'Se endringshistorikk',
      icon: Activity,
      path: '/admin/activity',
      roles: ['admin', 'editor']
    },
    {
      title: 'Varsler',
      description: 'Administrer varsler',
      icon: Bell,
      path: '/admin/notifications',
      roles: ['admin']
    },
    {
      title: 'Innstillinger',
      description: 'Systeminnstillinger',
      icon: Settings,
      path: '/admin/settings',
      roles: ['admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#003057] text-white">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Administrasjonspanel</h1>
                <p className="text-gray-600">Administrer innhold og brukere</p>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Button
                      onClick={() => navigate(item.path)}
                      className={cn(
                        "w-full h-auto p-6 bg-white hover:bg-gray-50",
                        "border border-gray-200 shadow-sm",
                        "flex flex-col items-center text-center gap-4"
                      )}
                    >
                      <div className="p-3 rounded-xl bg-gray-100">
                        <Icon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}