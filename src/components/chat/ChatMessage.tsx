import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
  onLinkClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function ChatMessage({ message, onLinkClick }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex",
        message.type === 'user' ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2 shadow-sm",
          message.type === 'user'
            ? "bg-[#003057] text-white"
            : "bg-white text-gray-900"
        )}
      >
        <div 
          className={cn(
            "prose prose-sm max-w-none",
            message.type === 'user' && "prose-invert"
          )}
          onClick={onLinkClick}
          dangerouslySetInnerHTML={{ __html: message.content }}
        />
      </div>
    </div>
  );
}