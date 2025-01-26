import React from 'react';
import { LayoutDashboard, ChevronRight, User, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function DashboardHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const currentTime = new Date().toLocaleTimeString('nb-NO', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const currentDate = new Date().toLocaleDateString('nb-NO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="px-8 py-8 border-b border-gray-200 bg-gray-50/80 header-shadow">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="hover:text-gray-900 transition-colors"
        >
          Nordre Follo kommune
        </button>
        <ChevronRight className="h-4 w-4 flex-shrink-0" />
        <button 
          onClick={() => navigate('/admin')}
          className="hover:text-gray-900 transition-colors"
        >
          Administrasjonspanel
        </button>
        {window.location.pathname !== '/admin' && (
          <>
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
            {window.location.pathname.includes('/principles') ? (
              <>
                <button 
                  onClick={() => navigate('/admin/areas')}
                  className="hover:text-gray-900 transition-colors"
                >
                  Områder
                </button>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <button 
                  onClick={() => navigate(-1)}
                  className="hover:text-gray-900 transition-colors"
                >
                  Kategorier
                </button>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-gray-900 font-medium truncate">
                  Prinsipper
                </span>
              </>
            ) : window.location.pathname.includes('/categories') ? (
              <>
                <button 
                  onClick={() => navigate('/admin/areas')}
                  className="hover:text-gray-900 transition-colors"
                >
                  Områder
                </button>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-gray-900 font-medium truncate">
                  Kategorier
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-medium truncate">
                Områder
              </span>
            )}
          </>
        )}
      </div>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-[#003057] text-white shadow-sm mt-1">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div className="mt-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-1 mt-2">Administrasjonspanel</h1>
            <p className="text-gray-600 text-sm">Administrer innhold og brukere</p>
          </div>
        </div>

        {/* User and Time Info */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-grow flex flex-col sm:flex-row sm:items-end sm:justify-end gap-3"
        >
          <div className="flex flex-col items-end text-sm">
            <div className="flex items-center gap-2 text-gray-900 font-medium">
              <User className="h-4 w-4 text-gray-500" />
              {user?.email}
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{currentTime}</span>
              <span>•</span>
              <span className="text-gray-400">{currentDate}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        {[
          { name: 'Områder', path: '/admin/areas' },
          { name: 'Kategorier', path: '/admin/categories' },
          { name: 'Prinsipper', path: '/admin/principles' },
          { name: 'Brukere', path: '/admin/users' }
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg",
              "bg-white text-gray-700 border border-gray-200",
              "hover:bg-gray-50 hover:border-gray-300 transition-colors",
              "shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003057]"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}