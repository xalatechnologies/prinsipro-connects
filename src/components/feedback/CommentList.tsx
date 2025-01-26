import React from 'react';
import { motion } from 'framer-motion';
import { Comment } from '@/types/feedback';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { feedbackStyle } from '@/data/feedback/mockFeedback';

interface CommentListProps {
  comments: Comment[];
  onAddReaction: (commentId: string, type: 'like' | 'dislike') => void;
}

export function CommentList({ comments, onAddReaction }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <motion.div
          key={comment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-4 rounded-lg border transition-colors",
            feedbackStyle.commentColors.bg,
            feedbackStyle.commentColors.border,
            feedbackStyle.commentColors.hover
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-gray-900">
                  {comment.user?.name || 'Anonym bruker'}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString('nb-NO')}
                </span>
              </div>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddReaction(comment.id, 'like')}
              className={cn(
                "text-gray-500 hover:text-blue-600",
                comment.reactions.some(r => r.type === 'like') && "text-blue-600"
              )}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {comment.reactions.filter(r => r.type === 'like').length}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddReaction(comment.id, 'dislike')}
              className={cn(
                "text-gray-500 hover:text-gray-600",
                comment.reactions.some(r => r.type === 'dislike') && "text-gray-600"
              )}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              {comment.reactions.filter(r => r.type === 'dislike').length}
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}