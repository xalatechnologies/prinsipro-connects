import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDataService } from '@hooks/useDataService';
import { Area } from '@/types';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Home,
  BookOpen,
  Settings,
  HelpCircle,
  Bell,
  User,
  Search,
  Filter,
  Clock,
  LayoutDashboard,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAreaSelect: (areaId: string) => void;
  userRole?: 'admin' | 'editor' | 'viewer';
}

export function SideMenu({ isOpen, onClose, onAreaSelect, userRole }: SideMenuProps) {
  const [areas, setAreas] = React.useState<Area[]>([]);
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'active' | 'completed'>('all');
  const navigate = useNavigate();
  const dataService = useDataService();

  React.useEffect(() => {
    const loadAreas = async () => {
      const loadedAreas = await dataService.getAreas();
      setAreas(loadedAreas);
    };
    loadAreas();
  }, [dataService]);

  const handleAreaClick = (areaId: string) => {
    onAreaSelect(areaId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-full sm:w-80 bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Meny</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Search className="h-5 w-5" />
                  <span>Søk i prinsipper</span>
                </button>
              </div>

              {/* Admin Dashboard Link */}
              {userRole === 'admin' && (
                <div className="px-4 mb-4">
                  <button 
                    onClick={() => navigate('/admin')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Shield className="h-5 w-5 text-[#003057]" />
                    <span className="font-medium">Admin Dashboard</span>
                  </button>
                </div>
              )}

              <div className="px-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value as any)}
                    className="text-sm border-0 bg-transparent font-medium text-gray-500 focus:outline-none focus:ring-0"
                  >
                    <option value="all">Alle prinsipper</option>
                    <option value="active">Aktive tiltak</option>
                    <option value="completed">Fullførte tiltak</option>
                  </select>
                </div>
              </div>

              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Områder
                </h3>
                <div className="space-y-1">
                  {areas.map((area) => {
                    const Icon = area.style.icon;
                    return (
                      <button
                        key={area.id}
                        onClick={() => handleAreaClick(area.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Icon className={cn("h-5 w-5", area.style.iconColor)} />
                        <span>{area.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Snarveier
                </h3>
                <div className="space-y-1">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span>Siste endringer</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Bell className="h-5 w-5 text-gray-400" />
                    <span>Varsler</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <BookOpen className="h-5 w-5 text-gray-400" />
                    <span>Dokumentasjon</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t">
              <div className="p-4">
                <div className="space-y-1">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <User className="h-5 w-5 text-gray-400" />
                    <span>Min profil</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Settings className="h-5 w-5 text-gray-400" />
                    <span>Innstillinger</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <HelpCircle className="h-5 w-5 text-gray-400" />
                    <span>Hjelp</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}