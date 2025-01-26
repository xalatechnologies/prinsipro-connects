import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, X } from 'lucide-react';
import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (data: Omit<Category, 'id' | 'principles' | 'guidelines' | 'style'> & { style: CategoryStyle }) => void;
  onClose: () => void;
}

export function CategoryForm({ category, onSubmit, onClose }: CategoryFormProps) {
  const [name, setName] = React.useState(category?.name || '');
  const [description, setDescription] = React.useState(category?.description || '');
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      setError('Navn er påkrevd');
      return;
    }

    if (!description.trim()) {
      setError('Beskrivelse er påkrevd');
      return;
    }

    onSubmit({
      name,
      description,
      area_id: category?.area_id || '',
      created_at: category?.created_at || new Date().toISOString(),
      style: {
        icon: BookOpen,
        bgColor: 'bg-white',
        textColor: 'text-gray-900',
        borderColor: 'border-gray-200',
        iconColor: 'text-gray-600',
        hoverBg: 'hover:bg-gray-50',
        tabs: []
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {category ? 'Rediger kategori' : 'Opprett ny kategori'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-900 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Navn
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  error && !name.trim() ? "border-red-300" : "border-gray-300"
                )}
                placeholder="F.eks. Sikkerhetskontroller"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beskrivelse
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  error && !description.trim() ? "border-red-300" : "border-gray-300"
                )}
                placeholder="Beskriv kategorien..."
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Avbryt
            </Button>
            <Button
              type="submit"
              className="bg-[#003057] hover:bg-[#002543]"
            >
              {category ? 'Lagre endringer' : 'Opprett kategori'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}