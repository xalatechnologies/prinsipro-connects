import React, { useState, useEffect } from 'react';
import { useDataService } from '@hooks/useDataService';
import { Exception, ExceptionStatus } from '@/types/exception';
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function ExceptionList() {
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ExceptionStatus | 'all'>('all');
  const dataService = useDataService();

  useEffect(() => {
    const loadExceptions = async () => {
      try {
        const data = await dataService.getExceptions();
        setExceptions(data);
      } catch (error) {
        console.error('Failed to load exceptions:', error);
      } finally {
        setLoading(false);
      }
    };
    loadExceptions();
  }, [dataService]);

  const getStatusIcon = (status: ExceptionStatus) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const filteredExceptions = exceptions.filter(
    exception => filter === 'all' || exception.status === filter
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Unntak og avvik</h2>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as ExceptionStatus | 'all')}
            className="rounded-lg border border-gray-300 px-4 py-2"
          >
            <option value="all">Alle unntak</option>
            <option value="pending">Venter på godkjenning</option>
            <option value="approved">Godkjent</option>
            <option value="rejected">Avvist</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Laster unntak...</div>
      ) : (
        <div className="space-y-4">
          {filteredExceptions.map((exception) => (
            <motion.div
              key={exception.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getStatusIcon(exception.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{exception.title}</h3>
                    <p className="text-gray-600 mt-1">{exception.description}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  exception.risk_assessment.level === 'critical' ? 'bg-red-100 text-red-800' :
                  exception.risk_assessment.level === 'high' ? 'bg-orange-100 text-orange-800' :
                  exception.risk_assessment.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {exception.risk_assessment.level}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Risikovurdering</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Konsekvens:</strong> {exception.risk_assessment.impact}</p>
                  <p><strong>Sannsynlighet:</strong> {exception.risk_assessment.probability}</p>
                  <div>
                    <strong>Risikoreduserende tiltak:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {exception.risk_assessment.mitigation.map((measure, index) => (
                        <li key={index}>{measure}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <p>Opprettet av: {exception.created_by}</p>
                <p>Dato: {new Date(exception.created_at).toLocaleDateString('nb-NO')}</p>
                {exception.expiry_date && (
                  <p>Utløper: {new Date(exception.expiry_date).toLocaleDateString('nb-NO')}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}