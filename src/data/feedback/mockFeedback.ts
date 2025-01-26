import { Comment, Rating, FeedbackStyle } from '@/types/feedback';

const timestamp = new Date().toISOString();

export const mockComments: Comment[] = [
  {
    id: "comment-001",
    principleId: "op-01",
    userId: "user-001",
    content: "Dette prinsippet har hjulpet oss med å forbedre brukeropplevelsen betydelig. Spesielt nyttig for innbyggerportalen vår.",
    createdAt: timestamp,
    reactions: [
      {
        id: "reaction-001",
        userId: "user-002",
        type: "like",
        createdAt: timestamp
      }
    ]
  },
  {
    id: "comment-002",
    principleId: "op-01",
    userId: "user-002",
    content: "Kunne vi fått flere konkrete eksempler på hvordan dette kan implementeres i praksis?",
    createdAt: timestamp,
    reactions: []
  },
  {
    id: "comment-003",
    principleId: "sec-01",
    userId: "user-003",
    content: "Zero Trust er definitivt veien å gå. Vi har sett gode resultater etter implementering.",
    createdAt: timestamp,
    reactions: [
      {
        id: "reaction-002",
        userId: "user-001",
        type: "like",
        createdAt: timestamp
      },
      {
        id: "reaction-003",
        userId: "user-004",
        type: "like",
        createdAt: timestamp
      }
    ]
  }
];

export const mockRatings: Rating[] = [
  {
    id: "rating-001",
    principleId: "op-01",
    userId: "user-001",
    value: 5,
    createdAt: timestamp
  },
  {
    id: "rating-002",
    principleId: "op-01",
    userId: "user-002",
    value: 4,
    createdAt: timestamp
  },
  {
    id: "rating-003",
    principleId: "sec-01",
    userId: "user-003",
    value: 5,
    createdAt: timestamp
  }
];

export const feedbackStyle: FeedbackStyle = {
  ratingColors: {
    1: 'text-red-500',
    2: 'text-orange-500',
    3: 'text-yellow-500',
    4: 'text-lime-500',
    5: 'text-green-500'
  },
  reactionColors: {
    like: 'text-blue-500',
    dislike: 'text-gray-500'
  },
  commentColors: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    hover: 'hover:border-blue-300'
  }
};