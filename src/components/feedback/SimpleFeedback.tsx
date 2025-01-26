import React from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

interface SimpleFeedbackProps {
  likes: number;
  dislikes: number;
  comments: number;
  onLike: () => void;
  onDislike: () => void;
  className?: string;
}

export function SimpleFeedback({
  likes,
  dislikes,
  comments,
  onLike,
  onDislike,
  className
}: SimpleFeedbackProps) {
  const handleReaction = async (type: 'like' | 'dislike') => {
    try {
      if (type === 'like') {
        await onLike();
      } else {
        await onDislike();
      }
      toast({
        title: "Tilbakemelding registrert",
        description: "Takk for din stemme!",
        duration: 2000
      });
    } catch (error) {
      toast({
        title: "Kunne ikke registrere tilbakemelding",
        description: "Prøv igjen senere",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  return (
    <motion.div 
      className={cn(
        "flex items-center gap-4 text-sm",
        className
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleReaction('like')}
        className="text-gray-500 hover:text-blue-600"
      >
        <ThumbsUp className="h-4 w-4 mr-1.5" />
        {likes}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleReaction('dislike')}
        className="text-gray-500 hover:text-red-600"
      >
        <ThumbsDown className="h-4 w-4 mr-1.5" />
        {dislikes}
      </Button>

      <div className="flex items-center text-gray-500">
        <MessageSquare className="h-4 w-4 mr-1.5" />
        {comments}
      </div>
    </motion.div>
  );
}