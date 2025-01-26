import React from 'react';
import { motion } from 'framer-motion';
import { Principle } from '@/types';
import { FeedbackSection } from '@/components/feedback/FeedbackSection';
import { CheckCircle2, Clock, AlertTriangle, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFeedback } from '@/hooks/useFeedback';

interface ValidationSectionProps {
  principle: Principle;
}

export function ValidationSection({ principle }: ValidationSectionProps) {
  const feedback = useFeedback(principle.id);

  const getStatusIcon = () => {
    switch (principle.status) {
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (principle.status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getStatusText = () => {
    switch (principle.status) {
      case 'approved':
        return 'Validert';
      case 'review':
        return 'Under validering';
      case 'draft':
        return 'Utkast';
      default:
        return 'Utgått';
    }
  };

  return (
    <div className="space-y-8">
      {/* Status Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          {getStatusIcon()}
          <h3 className="text-lg font-medium text-gray-900">
            Valideringsstatus
          </h3>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className={cn(
            "px-3 py-1 rounded-full text-sm font-medium border",
            getStatusColor()
          )}>
            {getStatusText()}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User className="h-4 w-4" />
            <span>Versjon {principle.version}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Oppdatert {new Date(principle.updated_at).toLocaleDateString('nb-NO')}</span>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {principle.reviews && principle.reviews.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Gjennomganger
          </h3>
          <div className="space-y-4">
            {principle.reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-900">
                      {review.reviewer_id}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.review_date).toLocaleDateString('nb-NO')}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{review.comments}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Neste gjennomgang: {new Date(review.next_review_date).toLocaleDateString('nb-NO')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Section */}
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
  );
}