import React from 'react';
import { Principle } from '@/types';
import { CheckSquare, Link, PenTool as Tool, BookOpen } from 'lucide-react';

interface ImplementationGuideProps {
  principle: Principle;
}

export function ImplementationGuide({ principle }: ImplementationGuideProps) {
  return (
    <div className="space-y-8">
      {principle.implementation?.steps.map((step, index) => (
        <div key={index} className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-medium">
              {index + 1}
            </div>
            <h5 className="text-lg font-medium text-gray-900">{step.title}</h5>
          </div>
          
          <p className="text-gray-600 mb-6">{step.description}</p>

          <div className="space-y-6">
            {step.checklist.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckSquare className="h-4 w-4 text-gray-500" />
                  <h6 className="font-medium text-gray-700">Sjekkliste</h6>
                </div>
                <ul className="space-y-2">
                  {step.checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {step.resources.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <h6 className="font-medium text-gray-700">Ressurser</h6>
                </div>
                <div className="grid gap-4">
                  {step.resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex-grow">
                        <h6 className="font-medium text-gray-900">{resource.title}</h6>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {resource.type}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {principle.implementation?.tools.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tool className="h-5 w-5 text-gray-500" />
            <h5 className="font-medium text-gray-900">Verktøy og teknologier</h5>
          </div>
          <div className="grid gap-4">
            {principle.implementation.tools.map((tool, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex-grow">
                  <h6 className="font-medium text-gray-900">{tool.name}</h6>
                  <p className="text-gray-600">{tool.description}</p>
                </div>
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Link className="h-5 w-5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}