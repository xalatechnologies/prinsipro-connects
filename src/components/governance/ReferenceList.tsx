import React, { useState, useEffect } from 'react';
import { useDataService } from '@hooks/useDataService';
import { Reference, ReferenceType } from '@/types/reference';
import { ExternalLink, BookOpen, Shield, Building } from 'lucide-react';
import { motion } from 'framer-motion';

export function ReferenceList() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ReferenceType | 'all'>('all');
  const dataService = useDataService();

  useEffect(() => {
    const loadReferences = async () => {
      try {
        const data = await dataService.getReferences();
        setReferences(data);
      } catch (error) {
        console.error('Failed to load references:', error);
      } finally {
        setLoading(false);
      }
    };
    loadReferences();
  }, [dataService]);

  const getTypeIcon = (type: ReferenceType) => {
    switch (type) {
      case 'DigDir':
        return <Building className="h-5 w-5" />;
      case 'NSM':
        return <Shield className="h-5 w-5" />;
      case 'NFK':
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const filteredReferences = references.filter(
    ref => filter === 'all' || ref.type === filter
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Referanser og standarder</h2>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as ReferenceType | 'all')}
            className="rounded-lg border border-gray-300 px-4 py-2"
          >
            <option value="all">Alle referanser</option>
            <option value="DigDir">DigDir</option>
            <option value="NSM">NSM</option>
            <option value="NFK">NFK</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Laster referanser...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredReferences.map((reference) => (
            <motion.div
              key={reference.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-2 rounded-lg ${
                  reference.type === 'DigDir' ? 'bg-blue-100 text-blue-600' :
                  reference.type === 'NSM' ? 'bg-purple-100 text-purple-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {getTypeIcon(reference.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-900">{reference.code}</h3>
                    <span className="text-sm text-gray-500">{reference.type}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{reference.title}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{reference.description}</p>

              {reference.url && (
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <span>Les mer</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}