import React from 'react';
import { motion } from 'framer-motion';
import { Code, Link, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Example {
  id: string;
  title: string;
  description: string;
  language: string;
  author: string;
  date: string;
  url?: string;
  codeSnippet?: string;
}

interface ExampleListProps {
  examples: Example[];
}

export function ExampleList({ examples }: ExampleListProps) {
  if (examples.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Code className="h-8 w-8 mx-auto mb-3 text-gray-400" />
        <p>Ingen eksempler er tilgjengelig for dette prinsippet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {examples.map((example) => (
        <motion.div
          key={example.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {example.title}
              </h3>
              <p className="text-gray-600">{example.description}</p>
            </div>

            {example.url && (
              <a
                href={example.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "text-emerald-600 hover:text-emerald-800",
                  "bg-emerald-50 hover:bg-emerald-100",
                  "transition-colors"
                )}
              >
                <span>Se kode</span>
                <Link className="h-4 w-4" />
              </a>
            )}
          </div>

          {example.codeSnippet && (
            <pre className={cn(
              "p-4 rounded-lg bg-gray-900 text-gray-100",
              "overflow-x-auto text-sm font-mono",
              "mb-4"
            )}>
              <code>{example.codeSnippet}</code>
            </pre>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>{example.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(example.date).toLocaleDateString('nb-NO')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{example.author}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}