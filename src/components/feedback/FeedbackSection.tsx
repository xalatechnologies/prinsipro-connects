import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Comment, Rating, FeedbackStats } from '@/types/feedback';
import { CommentList } from './CommentList';
import { RatingInput } from './RatingInput';
import { MessageSquare, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FeedbackSectionProps {
  principleId: string;
  comments: Comment[];
  ratings: Rating[];
  stats: FeedbackStats;
  onAddComment: (content: string) => void;
  onAddRating: (value: number) => void;
  onAddReaction: (commentId: string, type: 'like' | 'dislike') => void;
}

export function FeedbackSection({
  principleId,
  comments,
  ratings,
  stats,
  onAddComment,
  onAddRating,
  onAddReaction
}: FeedbackSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <h4 className="font-medium text-gray-900">Gjennomsnittlig vurdering</h4>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {stats.averageRating.toFixed(1)}
            <span className="text-sm font-normal text-gray-500 ml-1">
              av 5 ({stats.totalRatings} vurderinger)
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <h4 className="font-medium text-gray-900">Kommentarer</h4>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {stats.commentCount}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <ThumbsUp className="h-5 w-5 text-green-500" />
            <h4 className="font-medium text-gray-900">Positive reaksjoner</h4>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {stats.likes}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <ThumbsDown className="h-5 w-5 text-red-500" />
            <h4 className="font-medium text-gray-900">Negative reaksjoner</h4>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {stats.dislikes}
          </p>
        </motion.div>
      </div>

      {/* Rating Input */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Din vurdering</h3>
        <RatingInput
          initialValue={ratings.find(r => r.userId === 'current-user')?.value || 0}
          onChange={onAddRating}
        />
      </div>

      {/* Comment Input */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Legg til kommentar</h3>
        <form onSubmit={handleSubmitComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Del dine tanker om dette prinsippet..."
            className={cn(
              "w-full min-h-[100px] p-3 rounded-lg border border-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "resize-y"
            )}
            disabled={isSubmitting}
          />
          <div className="mt-4 flex justify-end">
            <Button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="bg-[#003057] hover:bg-[#002543] text-white"
            >
              {isSubmitting ? 'Sender...' : 'Send kommentar'}
            </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Kommentarer ({comments.length})
          </h3>
          <CommentList
            comments={comments}
            onAddReaction={onAddReaction}
          />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="h-8 w-8 mx-auto mb-3 text-gray-400" />
          <p>Ingen kommentarer ennå. Bli den første til å kommentere!</p>
        </div>
      )}
    </div>
  );
}