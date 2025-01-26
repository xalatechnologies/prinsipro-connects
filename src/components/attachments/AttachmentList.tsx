import React from 'react';
import { Attachment } from '@/types/attachment';
import { AttachmentCard } from './AttachmentCard';
import { Paperclip } from 'lucide-react';

interface AttachmentListProps {
  attachments: Attachment[];
}

export function AttachmentList({ attachments }: AttachmentListProps) {
  if (!attachments || attachments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Paperclip className="h-8 w-8 mx-auto mb-3 text-gray-400" />
        <p>Ingen vedlegg tilgjengelig for dette prinsippet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Paperclip className="h-5 w-5 text-gray-400" />
        <h3 className="font-medium text-gray-900">
          Vedlegg ({attachments.length})
        </h3>
      </div>

      <div className="space-y-4">
        {attachments.map((attachment) => (
          <AttachmentCard
            key={attachment.id}
            attachment={attachment}
          />
        ))}
      </div>
    </div>
  );
}