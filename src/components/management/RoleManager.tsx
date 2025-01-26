import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Shield, Filter, Grid2X2, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export function RoleManager({ roles, onRoleCreate, onRoleUpdate, onRoleDelete }) {
  const [viewMode, setViewMode] = useState('list');
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-200">
        <div className="px-8 py-6">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: 'Administrasjonspanel', href: '/admin' },
              { label: 'Roller' }
            ]}
          />
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Roller</h2>
            <Button onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
              {viewMode === 'list' ? <Grid2X2 /> : <List />}
            </Button>
          </div>
          <div className="mt-4">
            <Button onClick={onRoleCreate} className="mb-4">
              <Plus className="mr-2" /> Legg til rolle
            </Button>
            <div className="flex flex-wrap gap-4">
              {roles.filter(role => filter === 'all' || role.status === filter).map(role => (
                <div key={role.id} className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold">{role.name}</h3>
                  <div className="flex justify-between mt-2">
                    <Button onClick={() => onRoleUpdate(role)} variant="outline">
                      <Pencil className="mr-2" /> Rediger
                    </Button>
                    <Button onClick={() => onRoleDelete(role.id)} variant="outline" className="text-red-600">
                      <Trash2 className="mr-2" /> Slett
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
