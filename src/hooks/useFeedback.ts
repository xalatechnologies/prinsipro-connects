import { useState, useCallback } from 'react';
import { Comment, Rating, Reaction, FeedbackStats } from '@/types/feedback';
import { mockComments, mockRatings } from '@/data/feedback/mockFeedback';

export function useFeedback(principleId: string) {
  const [comments, setComments] = useState<Comment[]>(
    mockComments.filter(c => c.principleId === principleId)
  );
  const [ratings, setRatings] = useState<Rating[]>(
    mockRatings.filter(r => r.principleId === principleId)
  );

  // Calculate feedback stats
  const stats: FeedbackStats = {
    averageRating: ratings.length > 0
      ? ratings.reduce((acc, r) => acc + r.value, 0) / ratings.length
      : 0,
    totalRatings: ratings.length,
    likes: comments.reduce((acc, c) => 
      acc + c.reactions.filter(r => r.type === 'like').length, 0
    ),
    dislikes: comments.reduce((acc, c) => 
      acc + c.reactions.filter(r => r.type === 'dislike').length, 0
    ),
    commentCount: comments.length
  };

  const addComment = useCallback((content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      principleId,
      userId: 'current-user', // In a real app, get from auth context
      content,
      createdAt: new Date().toISOString(),
      reactions: [],
      user: {
        id: 'current-user',
        email: 'current@example.com',
        name: 'Gjeldende bruker',
        role: 'leser'
      }
    };

    setComments(prev => [...prev, newComment]);
  }, [principleId]);

  const addRating = useCallback((value: number) => {
    const userId = 'current-user'; // In a real app, get from auth context
    
    setRatings(prev => {
      // Remove any existing rating by this user
      const filtered = prev.filter(r => r.userId !== userId);
      
      // Add the new rating
      return [...filtered, {
        id: `rating-${Date.now()}`,
        principleId,
        userId,
        value: value as Rating['value'],
        createdAt: new Date().toISOString()
      }];
    });
  }, [principleId]);

  const addReaction = useCallback((commentId: string, type: 'like' | 'dislike') => {
    const userId = 'current-user'; // In a real app, get from auth context

    setComments(prev => prev.map(comment => {
      if (comment.id !== commentId) return comment;

      // Remove any existing reaction by this user
      const filteredReactions = comment.reactions.filter(r => r.userId !== userId);

      // Add the new reaction
      const newReaction: Reaction = {
        id: `reaction-${Date.now()}`,
        userId,
        type,
        createdAt: new Date().toISOString()
      };

      return {
        ...comment,
        reactions: [...filteredReactions, newReaction]
      };
    }));
  }, []);

  return {
    comments,
    ratings,
    stats,
    addComment,
    addRating,
    addReaction
  };
}