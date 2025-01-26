import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Principle } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Filter, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PrincipleForm } from './PrincipleForm';
import { ConfirmDialog } from './ConfirmDialog';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface PrinciplesListProps {
  principles: Principle[];
  categoryName: string;
  onPrincipleSelect?: (principle: Principle) => void;
  onPrincipleUpdate: (principle: Principle) => void;
  onPrincipleDelete: (principleId: string) => void;
  onPrincipleCreate: (principle: Omit<Principle, 'id'>) => void;
  onBack: () => void;
}

export function PrinciplesList({ 
  principles, 
  categoryName,
  onPrincipleUpdate, 
  onPrincipleDelete, 
  onPrincipleCreate,
  onBack
}: PrinciplesListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingPrinciple, setEditingPrinciple] = useState<Principle | null>(null);
  const [deletingPrincipleId, setDeletingPrincipleId] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const handleEdit = (principle: Principle) => {
    setEditingPrinciple(principle);
    setShowForm(true);
  };

  const handleDelete = async (principleId: string) => {
    if (deletingPrincipleId) {
      await onPrincipleDelete(principleId);
      setDeletingPrincipleId(null);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    if (editingPrinciple) {
      await onPrincipleUpdate({ ...editingPrinciple, ...formData });
    } else {
      await onPrincipleCreate(formData);
    }
    setShowForm(false);
    setEditingPrinciple(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-200">
        <div className="px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-grow">
              <Breadcrumb
                items={[
                  { label: 'Administrasjonspanel', path: '/admin' },
                  { label: 'Kategorier', path: '/admin/categories', onClick: onBack },
                  { label: categoryName }
                ]}
                className="mb-6"
              />

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Prinsipper for {categoryName}
              </h1>
              <p className="text-gray-600">
                Administrer prinsipper og deres tiltak
              </p>
            </div>

            <Button 
              onClick={() => setShowForm(true)}
              className="bg-[#003057] hover:bg-[#002543]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nytt prinsipp
            </Button>
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
                <option value="all">Alle prinsipper</option>
                <option value="approved">Godkjente</option>
                <option value="draft">Under arbeid</option>
                <option value="review">Til vurdering</option>
              </select>
            </div>

            <div className="flex-grow" />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{principles.length} prinsipper</span>
            </div>
          </div>
        </div>
      </div>

      {/* Principles List */}
      <div className={cn(
        "bg-white rounded-b-xl border border-gray-200",
        "border-t-0 -mt-6"
      )}>
        <div className="divide-y divide-gray-200">
          {principles.map((principle) => (
            <div key={principle.id} className="group">
              <div className={cn(
                "flex items-start gap-4 p-6",
                "hover:bg-gray-50/80 transition-colors"
              )}>
                <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div className="flex-grow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {principle.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {principle.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className={cn(
                          "px-2.5 py-1 rounded-full font-medium",
                          principle.status === 'approved' && "bg-green-100 text-green-800",
                          principle.status === 'draft' && "bg-gray-100 text-gray-800",
                          principle.status === 'review' && "bg-yellow-100 text-yellow-800"
                        )}>
                          {principle.status === 'approved' && 'Godkjent'}
                          {principle.status === 'draft' && 'Under arbeid'}
                          {principle.status === 'review' && 'Til vurdering'}
                        </div>

                        <span className="text-gray-500">
                          {principle.measures?.length || 0} tiltak
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(principle)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingPrincipleId(principle.id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Principle Form Modal */}
      {showForm && (
        <PrincipleForm
          principle={editingPrinciple}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingPrinciple(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deletingPrincipleId && (
        <ConfirmDialog
          title="Slett prinsipp"
          message="Er du sikker på at du vil slette dette prinsippet? Alle tilhørende tiltak vil også bli slettet. Denne handlingen kan ikke angres."
          confirmLabel="Slett"
          cancelLabel="Avbryt"
          onConfirm={() => handleDelete(deletingPrincipleId)}
          onCancel={() => setDeletingPrincipleId(null)}
          variant="destructive"
        />
      )}
    </div>
  );
}