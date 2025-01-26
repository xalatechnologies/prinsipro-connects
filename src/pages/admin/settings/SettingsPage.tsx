import React from 'react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { SettingsForm } from '@/components/admin/settings/SettingsForm';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Settings } from 'lucide-react';

export function SettingsPage() {
  const handleSave = () => {
    // In a real app, this would save to Supabase
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-200">
        <div className="px-8 py-6">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: 'Administrasjonspanel', path: '/admin' },
              { label: 'Innstillinger', icon: <Settings className="h-4 w-4" /> }
            ]}
          />
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Systeminnstillinger</h1>
              <p className="text-gray-600">
                Konfigurer systeminnstillinger og preferanser
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-b-xl border border-gray-200 p-8 border-t-0 -mt-6">
        <SettingsForm onSave={handleSave} />
      </div>
    </AdminLayout>
  );
}