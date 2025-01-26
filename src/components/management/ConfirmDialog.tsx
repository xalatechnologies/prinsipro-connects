import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'default' | 'destructive';
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  variant = 'default'
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4"
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            {variant === 'destructive' && (
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
              </h2>
              <p className="text-gray-600">
                {message}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              onClick={onConfirm}
              className={cn(
                variant === 'destructive'
                  ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  : "bg-[#003057] hover:bg-[#002543] focus:ring-blue-500"
              )}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}