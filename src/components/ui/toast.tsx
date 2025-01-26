import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  title: string;
  description?: string;
  duration?: number;
  variant?: 'default' | 'destructive';
  onClose?: () => void;
}

let toastId = 0;
const toasts: Map<number, ToastProps> = new Map();
const listeners: Set<(toasts: Map<number, ToastProps>) => void> = new Set();

function notifyListeners() {
  listeners.forEach(listener => listener(toasts));
}

export function toast(props: ToastProps): number {
  const id = toastId++;
  toasts.set(id, props);
  notifyListeners();

  if (props.duration !== Infinity) {
    setTimeout(() => {
      toasts.delete(id);
      notifyListeners();
    }, props.duration || 3000);
  }

  return id;
}

export function ToastProvider() {
  const [visibleToasts, setVisibleToasts] = React.useState<Map<number, ToastProps>>(toasts);

  React.useEffect(() => {
    function handleToastsChange(newToasts: Map<number, ToastProps>) {
      setVisibleToasts(new Map(newToasts));
    }

    listeners.add(handleToastsChange);
    return () => {
      listeners.delete(handleToastsChange);
    };
  }, []);

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {Array.from(visibleToasts.entries()).map(([id, toast]) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="pointer-events-auto"
          >
            <div
              className={cn(
                "rounded-lg shadow-lg p-4 bg-white border",
                toast.variant === 'destructive'
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-grow">
                  <h3 className={cn(
                    "font-medium",
                    toast.variant === 'destructive'
                      ? "text-red-900"
                      : "text-gray-900"
                  )}>
                    {toast.title}
                  </h3>
                  {toast.description && (
                    <p className={cn(
                      "text-sm mt-1",
                      toast.variant === 'destructive'
                        ? "text-red-700"
                        : "text-gray-600"
                    )}>
                      {toast.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    toasts.delete(id);
                    notifyListeners();
                    toast.onClose?.();
                  }}
                  className={cn(
                    "p-1 rounded-md transition-colors",
                    toast.variant === 'destructive'
                      ? "text-red-700 hover:bg-red-100"
                      : "text-gray-500 hover:bg-gray-100"
                  )}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}