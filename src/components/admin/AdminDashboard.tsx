import React, { useCallback, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { DashboardHeader } from '@/components/admin/header/DashboardHeader';
import { MenuGrid } from '@/components/admin/menu/MenuGrid';
import { DashboardStats } from '@/components/admin/stats/DashboardStats';
import { DashboardSearch } from '@/components/admin/search/DashboardSearch';
import { DashboardFilters } from '@/components/admin/filters/DashboardFilters';
import { DashboardActivity } from '@/components/admin/activity/DashboardActivity';
import { DashboardNotifications } from '@/components/admin/notifications/DashboardNotifications';
import { DashboardFeedback } from '@/components/admin/feedback/DashboardFeedback';
import { CollapsibleWidget } from '@/components/admin/widgets/CollapsibleWidget';
import { useAdminMenu } from '@/hooks/useAdminMenu';
import { cn } from '@/lib/utils';
import { Activity, MessageSquare, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import type { AdminMenuCategory } from '@/types/admin';

import type { UserRole } from '@/types/user';

interface AdminDashboardProps {
  userRole: UserRole;
}

export function AdminDashboard({ userRole }: AdminDashboardProps) {
  const navigate = useNavigate();
  const { menuItems } = useAdminMenu({ userRole });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<AdminMenuCategory | 'all'>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const handleMenuItemClick = useCallback((path: string) => {
    // Handle special cases for management views
    if (path === '/admin/areas') {
      navigate('/admin/areas');
    } else if (path === '/admin/categories') {
      navigate('/admin/categories');
    } else if (path === '/admin/principles') {
      navigate('/admin/principles');
    } else {
      navigate(path);
    }
  }, [navigate]);

  const filteredItems = menuItems.filter(item => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    if (activeFilter !== 'all') {
      return item.category === activeFilter;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar 
          onAreaSelect={() => {}} 
          onViewChange={() => {}} 
          currentView="admin" 
        />
      </div>

      {/* Main Content */}
      <div className="container max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {/* Left Column - Main Dashboard */}
          <div className="lg:col-span-3 xl:col-span-4">
            {/* Header and Stats */}
            <div className={cn(
              "bg-white rounded-xl shadow-sm border border-gray-200",
              "section-shadow",
              "transition-all duration-200"
            )}>
              <DashboardHeader />
              <div className="border-b border-gray-200">
                <DashboardStats />
              </div>
              <div className="border-b border-gray-200 bg-gray-50/50">
                <div className="px-8 py-4 flex flex-col sm:flex-row gap-4">
                  <DashboardSearch
                    value={searchQuery}
                    onChange={setSearchQuery}
                  />
                  <DashboardFilters
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    view={view}
                    onViewChange={setView}
                  />
                </div>
              </div>
              <div className="p-8">
                <MenuGrid 
                  items={filteredItems}
                  onItemClick={handleMenuItemClick}
                  view={view}
                  filter={activeFilter}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Notifications */}
          <div className="lg:col-span-1 space-y-8">
            {/* Recent Activity */}
            <CollapsibleWidget
              defaultCollapsed={false}
              title="Siste aktivitet" 
              icon={<Activity className="h-5 w-5 text-gray-400" />}
            >
              <DashboardActivity />
            </CollapsibleWidget>
            
            {/* Recent Feedback */}
            <CollapsibleWidget 
              defaultCollapsed={true}
              title="Tilbakemeldinger" 
              icon={<MessageSquare className="h-5 w-5 text-gray-400" />}
            >
              <DashboardFeedback />
            </CollapsibleWidget>

            {/* Notifications */}
            <CollapsibleWidget 
              defaultCollapsed={true}
              title="Varsler" 
              icon={<Bell className="h-5 w-5 text-gray-400" />}
            >
              <DashboardNotifications />
            </CollapsibleWidget>
          </div>
        </div>
      </div>
    </div>
  );
}