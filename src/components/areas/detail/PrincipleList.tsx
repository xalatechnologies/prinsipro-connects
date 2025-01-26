import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Principle } from '@types/index';
import { MeasureList } from './MeasureList';
import { ImplementationGuide } from './ImplementationGuide';
import { ValidationSection } from './ValidationSection';
import { AttachmentList } from '@/components/attachments/AttachmentList';
import { FeedbackSection } from '@/components/feedback/FeedbackSection';
import { CaseStudyList } from './CaseStudyList';
import { ExampleList } from './ExampleList';
import { useFeedback } from '@/hooks/useFeedback';
import { 
  ChevronDown, 
  Link,
  BookOpen,
  Layers,
  Target,
  HelpCircle,
  AlertTriangle,
  XCircle,
  MessageSquare,
  CheckSquare,
  Paperclip,
  FileText,
  Code,
  ArrowLeft,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { REFERENCE_STYLES } from '@/types/reference';

interface PrincipleListProps {
  principles: Principle[];
  onBack?: () => void;
  categoryName?: string;
  categoryDescription?: string;
  categoryIcon?: LucideIcon;
}

export function PrincipleList({ 
  principles, 
  onBack, 
  categoryName = "Prinsipper",
  categoryDescription,
  categoryIcon: CategoryIcon = BookOpen
}: PrincipleListProps) {
  const [openPrincipleId, setOpenPrincipleId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'implementation' | 'validation' | 'case-studies' | 'examples' | 'attachments'>('overview');
  const [filter, setFilter] = useState('all');

  const togglePrinciple = (id: string) => {
    setOpenPrincipleId(openPrincipleId === id ? null : id);
    setActiveTab('overview');
  };

  return (
    <div className="space-y-6">
      {/* Modern Header */}
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-200">
        <div className="px-8 py-6">
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-6 text-gray-600 hover:text-gray-900 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbake
            </Button>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="p-4 rounded-xl bg-[#003057] text-white">
                <CategoryIcon className="h-8 w-8" />
              </div>
            </div>
            
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
              {categoryDescription && (
                <p className="text-lg text-gray-600 mb-4">{categoryDescription}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{principles.length} prinsipper i denne kategorien</span>
              </div>
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
                <option value="all">Alle prinsipper</option>
                <option value="active">Aktive</option>
                <option value="draft">Under arbeid</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Principles List */}
      <div className={cn(
        "bg-white rounded-b-xl border border-gray-200",
        "border-t-0 -mt-6" // Connect with header
      )}>
        <div className="divide-y divide-gray-200">
          {principles.map((principle) => {
            const isOpen = openPrincipleId === principle.id;
            const hasReferences = principle.references?.length > 0;
            const feedback = useFeedback(principle.id);
            
            return (
              <div key={principle.id} className="group">
                <div 
                  onClick={() => togglePrinciple(principle.id)}
                  className={cn(
                    "w-full text-left px-6 sm:px-8 py-6",
                    "hover:bg-gray-50/80 transition-colors cursor-pointer",
                    "group-first:rounded-t-xl",
                    isOpen && "bg-gray-50/50"
                  )}
                >
                  {/* Principle header content */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-2.5 rounded-lg transition-colors hidden sm:block",
                        isOpen ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                      )}>
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {principle.title}
                          </h4>
                          {hasReferences && (
                            <div className="flex flex-wrap items-center gap-2">
                              {principle.references.map((ref, index) => {
                                const style = REFERENCE_STYLES[ref.type];
                                if (!style) return null;
                                const RefIcon = style.icon;
                                return (
                                  <span
                                    key={`${ref.reference_id}-${index}`}
                                    className={cn(
                                      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full",
                                      "text-xs font-medium",
                                      style.bgColor,
                                      style.textColor
                                    )}
                                  >
                                    <RefIcon className="h-3.5 w-3.5" />
                                    <span>{ref.code}</span>
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <p className="text-base text-gray-600 leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 p-2">
                      <ChevronDown className={cn(
                        "h-5 w-5 text-gray-400 transition-transform duration-200",
                        isOpen && "transform rotate-180"
                      )} />
                    </div>
                  </div>

                  {/* References */}
                  {hasReferences && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {principle.references.map((ref, index) => {
                        const style = REFERENCE_STYLES[ref.type];
                        if (!style) return null;
                        const RefIcon = style.icon;
                        return (
                          <a
                            key={`${ref.reference_id}-link-${index}`}
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                              "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg",
                              "text-sm transition-colors",
                              style.badgeBg,
                              style.badgeText,
                              style.hoverBg
                            )}
                          >
                            <RefIcon className="h-4 w-4" />
                            <span className="font-medium">{style.name}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded-md bg-white/60">
                              {ref.code}
                            </span>
                            <Link className="h-3.5 w-3.5 ml-1" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-200 bg-white"
                    >
                      {/* Tabs */}
                      <div className="px-6 sm:px-8">
                        <div className="flex gap-1 -mb-px overflow-x-auto">
                          {[
                            { id: 'overview', label: 'Oversikt', icon: BookOpen },
                            { id: 'implementation', label: 'Implementering', icon: Layers },
                            { id: 'validation', label: 'Validering', icon: CheckSquare },
                            { id: 'case-studies', label: 'Case Studies', icon: FileText },
                            { id: 'examples', label: 'Eksempler', icon: Code },
                            { id: 'attachments', label: 'Vedlegg', icon: Paperclip }
                          ].map(tab => {
                            const TabIcon = tab.icon;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                  "flex items-center gap-2 px-4 py-3",
                                  "text-sm font-medium whitespace-nowrap",
                                  "border-b-2 transition-colors",
                                  activeTab === tab.id
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                )}
                              >
                                <TabIcon className="h-4 w-4" />
                                <span>{tab.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8 border-t border-gray-200">
                        {activeTab === 'overview' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="bg-blue-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <Target className="h-5 w-5 text-blue-600" />
                                  <h5 className="font-medium text-blue-900">Mål</h5>
                                </div>
                                <p className="text-blue-800 leading-relaxed">
                                  {principle.goal}
                                </p>
                              </div>

                              <div className="bg-purple-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <HelpCircle className="h-5 w-5 text-purple-600" />
                                  <h5 className="font-medium text-purple-900">
                                    Hvorfor er dette viktig?
                                  </h5>
                                </div>
                                <p className="text-purple-800 leading-relaxed">
                                  {principle.importance}
                                </p>
                              </div>
                            </div>

                            <div className="bg-amber-50 rounded-xl p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                                <h5 className="font-medium text-amber-900">
                                  Konsekvenser ved manglende implementering
                                </h5>
                              </div>
                              <p className="text-amber-800 leading-relaxed">
                                {principle.consequences}
                              </p>
                            </div>

                            {principle.exceptions?.length > 0 && (
                              <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <XCircle className="h-5 w-5 text-gray-600" />
                                  <h5 className="font-medium text-gray-900">Unntak</h5>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                  {principle.exceptions.map((exception, index) => (
                                    <li key={index}>{typeof exception === 'string' ? exception : exception.title}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {principle.measures?.length > 0 && (
                              <MeasureList measures={principle.measures} />
                            )}

                            {/* Feedback section */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                              <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Tilbakemeldinger og vurderinger
                              </h3>
                              <FeedbackSection
                                principleId={principle.id}
                                comments={feedback.comments}
                                ratings={feedback.ratings}
                                stats={feedback.stats}
                                onAddComment={feedback.addComment}
                                onAddRating={feedback.addRating}
                                onAddReaction={feedback.addReaction}
                              />
                            </div>
                          </div>
                        )}

                        {activeTab === 'implementation' && (
                          <ImplementationGuide principle={principle} />
                        )}

                        {activeTab === 'validation' && (
                          <ValidationSection principle={principle} />
                        )}

                        {activeTab === 'case-studies' && (
                          <CaseStudyList caseStudies={principle.caseStudies || []} />
                        )}

                        {activeTab === 'examples' && (
                          <ExampleList examples={principle.examples || []} />
                        )}

                        {activeTab === 'attachments' && (
                          <AttachmentList attachments={principle.attachments || []} />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}