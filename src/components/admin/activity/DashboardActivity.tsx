import React from 'react';
import { Activity, User, FileText, Settings, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    user: 'Jan Johansen',
    action: 'oppdaterte prinsippet',
    target: 'OP-01 Brukerbehov',
    time: '5 min siden',
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    id: 2,
    user: 'Kari Olsen',
    action: 'la til ny bruker',
    target: 'Ole Nordmann',
    time: '15 min siden',
    icon: User,
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    id: 3,
    user: 'System',
    action: 'oppdaterte sikkerhetsinnstillinger',
    target: 'MFA-krav',
    time: '1 time siden',
    icon: Shield,
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
];

export function DashboardActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={cn("p-2 rounded-lg", activity.bg)}>
              <Icon className={cn("h-4 w-4", activity.color)} />
            </div>
            <div className="flex-grow">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{activity.user}</span>
                {' '}{activity.action}{' '}
                <span className="font-medium text-gray-900">{activity.target}</span>
              </p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}