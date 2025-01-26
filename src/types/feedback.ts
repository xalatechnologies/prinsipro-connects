import { User } from './user';

export type RatingValue = 1 | 2 | 3 | 4 | 5;
export type ReactionType = 'like' | 'dislike';

export interface Comment {
  id: string;
  principleId: string;
  userId: string;
  content: string;
  parentId?: string;
  createdAt: string;
  updatedAt?: string;
  reactions: Reaction[];
  user?: User;
}

export interface Rating {
  id: string;
  principleId: string;
  userId: string;
  value: RatingValue;
  createdAt: string;
}

export interface Reaction {
  id: string;
  userId: string;
  type: ReactionType;
  createdAt: string;
}

export interface FeedbackStats {
  averageRating: number;
  totalRatings: number;
  likes: number;
  dislikes: number;
  commentCount: number;
}

export interface FeedbackStyle {
  ratingColors: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
  reactionColors: {
    like: string;
    dislike: string;
  };
  commentColors: {
    bg: string;
    border: string;
    hover: string;
  };
}