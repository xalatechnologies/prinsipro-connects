import React from 'react';
import { motion } from 'framer-motion';
import { Principle } from '@/types';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrincipleFormProps {
  principle?: Principle | null;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export function PrincipleForm({ principle, onSubmit, onClose }: PrincipleFormProps) {
  const [title, setTitle] = React.useState(principle?.title || '');
  const [description, setDescription] = React.useState(principle?.description || '');
  const [goal, setGoal] = React.useState(principle?.goal || '');
  const [importance, setImportance] = React.useState(principle?.importance || '');
  const [consequences, setConsequences] = React.useState(principle?.consequences || '');
  const [status, setStatus] = React.useState(principle?.status || 'draft');
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setError('Tittel er påkrevd');
      return;
    }

    if (!description.trim()) {
      setError('Beskrivelse er påkrevd');
      return;
    }

    if (!goal.trim()) {
      setError('Mål er påkrevd');
      return;
    }

    onSubmit({
      title,
      description,
      goal,
      importance,
      consequences,
      status,
      created_at: principle?.created_at || new Date().toISOString(),
      version: principle?.version || '1.0'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {principle ? 'Rediger prinsipp' : 'Opprett nytt prinsipp'}
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
                Tittel
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  error && !title.trim() ? "border-red-300" : "border-gray-300"
                )}
                placeholder="F.eks. OP-01 Ta utgangspunkt i brukernes behov"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beskrivelse
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  error && !description.trim() ? "border-red-300" : "border-gray-300"
                )}
                placeholder="Beskriv prinsippet..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mål
              </label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                rows={2}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  error && !goal.trim() ? "border-red-300" : "border-gray-300"
                )}
                placeholder="Hva er målet med dette prinsippet?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hvorfor er dette viktig?
              </label>
              <textarea
                value={importance}
                onChange={(e) => setImportance(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Beskriv viktigheten av prinsippet..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konsekvenser ved manglende implementering
              </label>
              <textarea
                value={consequences}
                onChange={(e) => setConsequences(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Beskriv konsekvensene..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Under arbeid</option>
                <option value="review">Til vurdering</option>
                <option value="approved">Godkjent</option>
                <option value="deprecated">Utfaset</option>
              </select>
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
              {principle ? 'Lagre endringer' : 'Opprett prinsipp'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}