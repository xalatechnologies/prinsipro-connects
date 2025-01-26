import React from 'react';
import { motion } from 'framer-motion';
import { Attachment } from '@/types/attachment';
import { Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AttachmentCardProps {
  attachment: Attachment;
}

export function AttachmentCard({ attachment }: AttachmentCardProps) {
  const Icon = attachment.style.icon;
  const fileSize = attachment.fileSize ? formatFileSize(attachment.fileSize) : 'Ukjent størrelse';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex items-start gap-4 p-4 rounded-lg border transition-colors',
        attachment.style.bgColor,
        attachment.style.borderColor
      )}
    >
      <div className={cn(
        'p-2 rounded-lg bg-white/50',
        attachment.style.iconColor
      )}>
        <Icon className="h-6 w-6" />
      </div>

      <div className="flex-grow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className={cn(
              'font-medium mb-1',
              attachment.style.textColor
            )}>
              {attachment.fileName}
            </h4>
            {attachment.description && (
              <p className="text-sm text-gray-600 mb-2">
                {attachment.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {attachment.attachmentType === 'video' ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => window.open(attachment.fileUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Åpne
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => window.open(attachment.fileUrl, '_blank')}
              >
                <Download className="h-4 w-4 mr-1" />
                Last ned
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span>{fileSize}</span>
          <span>•</span>
          <span>Lastet opp {new Date(attachment.uploadedAt).toLocaleDateString('nb-NO')}</span>
          {attachment.uploadedBy && (
            <>
              <span>•</span>
              <span>{attachment.uploadedBy}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}