import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  time: string;
  unread?: boolean;
  actionLabel?: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'Ny sikkerhetspolicy',
    message: 'Oppdaterte retningslinjer for passordkrav er nå aktive.',
    type: 'info',
    time: '1 time siden',
    unread: true,
    actionLabel: 'Se detaljer'
  },
  {
    id: 2,
    title: 'Systemvedlikehold',
    message: 'Planlagt vedlikehold 22. mars kl 22:00.',
    type: 'warning',
    time: '3 timer siden',
    unread: true,
    actionLabel: 'Vis mer'
  },
  {
    id: 3,
    title: 'Backup fullført',
    message: 'Daglig backup av databasen er fullført.',
    type: 'success',
    time: '5 timer siden',
    unread: false,
    actionLabel: 'Se logg'
  }
];

const typeStyles = {
  info: {
    icon: Info,
    bg: 'bg-blue-100',
    color: 'text-blue-600',
    border: 'border-blue-200',
    dot: 'bg-blue-500'
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-100',
    color: 'text-amber-600',
    border: 'border-amber-200',
    dot: 'bg-amber-500'
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-green-100',
    color: 'text-green-600',
    border: 'border-green-200',
    dot: 'bg-green-500'
  }
};

export function DashboardNotifications() {
  const [dismissedIds, setDismissedIds] = React.useState<Set<number>>(new Set());

  const handleDismiss = (id: number) => {
    setDismissedIds(prev => new Set([...prev, id]));
  };

  const visibleNotifications = notifications.filter(n => !dismissedIds.has(n.id));

  return (
    <div className="space-y-4">
      {visibleNotifications.map((notification, index) => {
        const style = typeStyles[notification.type as keyof typeof typeStyles];
        const Icon = style.icon;
        
        return (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className={cn(
              "p-4 relative overflow-hidden bg-white rounded-lg border border-gray-200",
              "hover:bg-gray-50 transition-colors duration-200",
              notification.unread && "border-blue-200"
            )}>
              {/* Gradient overlay */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                "bg-gradient-to-r from-transparent via-gray-50/30 to-transparent"
              )} />

              <div className="relative flex items-start gap-4">
                <div className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  style.bg,
                  "transform group-hover:scale-110 group-hover:rotate-3"
                )}>
                  <Icon className={cn("h-4 w-4", style.color)} />
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900 truncate">
                          {notification.title}
                        </h4>
                        {notification.unread && (
                          <span className={cn(
                            "w-2 h-2 rounded-full",
                            style.dot,
                            "animate-pulse"
                          )} />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDismiss(notification.id)}
                      className={cn(
                        "opacity-0 group-hover:opacity-100",
                        "transition-opacity duration-200",
                        "-mr-2 -mt-2"
                      )}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-sm",
                        style.color,
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                        "-mb-1"
                      )}
                    >
                      {notification.actionLabel}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {visibleNotifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="group relative"
        >
          <Bell className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Ingen nye varsler</p>
        </motion.div>
      )}
    </div>
  );
}