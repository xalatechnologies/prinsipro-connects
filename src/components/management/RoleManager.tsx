import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Shield, Filter, Grid2X2, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface RoleManagerProps {
  roles: Role[];
  onRoleCreate: (role: Omit<Role, 'id'>) => void;
  onRoleUpdate: (role: Role) => void;
  onRoleDelete: (roleId: string) => void;
}

export function RoleManager({ roles, onRoleCreate, onRoleUpdate, onRoleDelete }: RoleManagerProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-200">
        <div className="px-8 py-6">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: 'Administrasjonspanel', path: '/admin' },
              { label: 'Roller' }
            ]}
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Roller</h1>
              <p className="text-gray-600">
                Administrer roller og tilganger
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={cn(
                  "px-3",
                  viewMode === 'grid' && "bg-gray-100"
                )}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={cn(
                  "px-3",
                  viewMode === 'list' && "bg-gray-100"
                )}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => {}} // Open create role modal
                className="bg-[#003057] hover:bg-[#002543]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ny rolle
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-8 py-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>Filter:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border-0 bg-transparent font-medium text-gray-900 focus:outline-none focus:ring-0"
              >
                <option value="all">Alle roller</option>
                <option value="system">Systemroller</option>
                <option value="custom">Egendefinerte roller</option>
              </select>
            </div>

            <div className="flex-grow" />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{roles.length} roller</span>
            </div>
          </div>
        </div>
      </div>

      {/* Roles List */}
      <div className={cn(
        "bg-white rounded-b-xl border border-gray-200 p-8",
        "border-t-0 -mt-6"
      )}>
        <div className={cn(
          viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        )}>
          {roles.map((role) => (
            <div
              key={role.id}
              className={cn(
                "flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200",
                "hover:bg-gray-50 transition-colors duration-200"
              )}
            >
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-lg bg-gray-50">
                    <Shield className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {role.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {}} // Open edit role modal
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRoleDelete(role.id)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}