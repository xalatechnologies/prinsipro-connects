import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Link, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  organization: string;
  date: string;
  author: string;
  url?: string;
}

interface CaseStudyListProps {
  caseStudies: CaseStudy[];
}

export function CaseStudyList({ caseStudies }: CaseStudyListProps) {
  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <FileText className="h-8 w-8 mx-auto mb-3 text-gray-400" />
        <p>Ingen case studies er tilgjengelig for dette prinsippet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {caseStudies.map((study) => (
        <motion.div
          key={study.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-grow">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {study.title}
              </h3>
              <p className="text-gray-600 mb-4">{study.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{study.organization}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(study.date).toLocaleDateString('nb-NO')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{study.author}</span>
                </div>
              </div>
            </div>

            {study.url && (
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "text-blue-600 hover:text-blue-800",
                  "bg-blue-50 hover:bg-blue-100",
                  "transition-colors"
                )}
              >
                <span>Les mer</span>
                <Link className="h-4 w-4" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}