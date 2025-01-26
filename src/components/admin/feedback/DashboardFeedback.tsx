import React from 'react';
import { MessageSquare, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const recentFeedback = [
  {
    id: 1,
    user: 'Maria Hansen',
    type: 'comment',
    content: 'Veldig nyttig prinsipp for vår avdeling.',
    target: 'OP-01 Brukerbehov',
    time: '10 min siden',
    icon: MessageSquare,
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    id: 2,
    user: 'Per Olsen',
    type: 'rating',
    content: '5 stjerner',
    target: 'SEC-01 Zero Trust',
    time: '30 min siden',
    icon: Star,
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  {
    id: 3,
    user: 'Lars Jensen',
    type: 'reaction',
    content: 'Likte',
    target: 'API-01 API-først',
    time: '1 time siden',
    icon: ThumbsUp,
    color: 'text-green-600',
    bg: 'bg-green-100'
  }
];

export function DashboardFeedback() {
  return (
    <div>
      <div className="space-y-4">
        {recentFeedback.map((feedback, index) => {
          const Icon = feedback.icon;
          return (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={cn("p-2 rounded-lg", feedback.bg)}>
                <Icon className={cn("h-4 w-4", feedback.color)} />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{feedback.user}</span>
                  {' '}{feedback.type === 'comment' ? 'kommenterte på' : 
                       feedback.type === 'rating' ? 'ga' : 
                       'reagerte på'}{' '}
                  <span className="font-medium text-gray-900">{feedback.target}</span>
                </p>
                <p className="text-sm text-gray-700 mt-1">{feedback.content}</p>
                <span className="text-xs text-gray-500 mt-1 block">{feedback.time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}