import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Area } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, MoreVertical, Filter, Grid2X2, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StyledCard } from '@/components/ui/StyledCard';
import { AreaForm } from './AreaForm';
import { ConfirmDialog } from './ConfirmDialog';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useNavigate } from 'react-router-dom';

interface AreasListProps {
  areas: Area[];
  onAreaSelect?: (area: Area) => void;
  onAreaUpdate: (area: Area) => void;
  onAreaDelete: (areaId: string) => void;
  onAreaCreate: (area: Omit<Area, 'id'>) => void;
}

export function AreasList({ areas, onAreaSelect, onAreaUpdate, onAreaDelete, onAreaCreate }: AreasListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingArea, setEditingArea] = useState<Area | null>(null);
  const [deletingAreaId, setDeletingAreaId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const handleEdit = (area: Area) => {
    setEditingArea(area);
    setShowForm(true);
  };

  const handleDelete = async (areaId: string) => {
    if (deletingAreaId) {
      await onAreaDelete(areaId);
      setDeletingAreaId(null);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    if (editingArea) {
      await onAreaUpdate({ ...editingArea, ...formData });
    } else {
      await onAreaCreate(formData);
    }
    setShowForm(false);
    setEditingArea(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-200">
        <div className="px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb
            className="mb-6"
            items={[
              { label: 'Administrasjonspanel', path: '/admin' },
              { label: 'Områder' }
            ]}
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Områder</h1>
              <p className="text-gray-600">
                Administrer arkitekturområder og deres kategorier
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
                onClick={() => setShowForm(true)}
                className="bg-[#003057] hover:bg-[#002543]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nytt område
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
                <option value="all">Alle områder</option>
                <option value="active">Aktive</option>
                <option value="draft">Under arbeid</option>
              </select>
            </div>

            <div className="flex-grow" />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{areas.length} områder</span>
            </div>
          </div>
        </div>
      </div>

      {/* Areas Grid/List */}
      <div className={cn(
        "bg-white rounded-b-xl border border-gray-200 p-8",
        "border-t-0 -mt-6"
      )}>
        <div className={cn(
          viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        )}>
          {areas.map((area) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {viewMode === 'list' ? (
                <StyledCard
                  variant="hover"
                  className="flex items-center gap-4"
                >
                  <div className="flex-grow min-w-0">
                    <button
                      onClick={() => onAreaSelect?.(area)}
                      className="flex items-center gap-3 mb-2 hover:text-[#003057] transition-colors w-full text-left"
                    >
                      <div className="p-2.5 rounded-lg bg-gray-50">
                        <area.style.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {area.name}
                      </h3>
                    </button>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {area.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(area)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingAreaId(area.id)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </StyledCard>
              ) : (
                <StyledCard
                  variant="interactive"
                  className="h-[280px] flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-gray-50">
                        <area.style.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {area.name}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-gray-600 flex-grow line-clamp-3">
                    {area.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">
                      {area.categories.length} kategorier
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(area)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingAreaId(area.id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </StyledCard>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Area Form Modal */}
      {showForm && (
        <AreaForm
          area={editingArea}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingArea(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deletingAreaId && (
        <ConfirmDialog
          title="Slett område"
          message="Er du sikker på at du vil slette dette området? Denne handlingen kan ikke angres."
          confirmLabel="Slett"
          cancelLabel="Avbryt"
          onConfirm={() => handleDelete(deletingAreaId)}
          onCancel={() => setDeletingAreaId(null)}
          variant="destructive"
        />
      )}
    </div>
  );
}
