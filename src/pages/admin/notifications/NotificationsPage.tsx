import React from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DashboardNotifications } from '@/components/admin/notifications/DashboardNotifications';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Bell } from 'lucide-react';

export function NotificationsPage() {
  return (
    <AdminLayout>
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-200">
        <div className="px-8 py-6">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: 'Administrasjonspanel', path: '/admin' },
              { label: 'Varsler', icon: <Bell className="h-4 w-4" /> }
            ]}
          />
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Varsler</h1>
              <p className="text-gray-600">
                Håndter systemvarsler og viktige meldinger
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-b-xl border border-gray-200 p-8 border-t-0 -mt-6">
        <DashboardNotifications />
      </div>
    </AdminLayout>
  );
}