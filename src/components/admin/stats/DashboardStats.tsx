import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const stats = [
  {
    label: 'Aktive brukere',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    label: 'Prinsipper',
    value: '156',
    change: '+8%',
    trend: 'up',
    icon: FileText,
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    label: 'Åpne unntak',
    value: '3',
    change: '-25%',
    trend: 'down',
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  {
    label: 'Fullførte tiltak',
    value: '89%',
    change: '+5%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100'
  }
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 card-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}