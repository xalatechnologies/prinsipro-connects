import React from 'react';
import { Bot, Sparkles, X } from 'lucide-react';

interface ChatHeaderProps {
  isTyping: boolean;
  onClose: () => void;
}

export function ChatHeader({ isTyping, onClose }: ChatHeaderProps) {
  return (
    <div className="bg-[#003057] p-4 text-white flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          {isTyping ? <Sparkles className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </div>
        <h2 className="font-semibold">Arkitektur Assistent</h2>
      </div>
      <button
        onClick={onClose}
        className="p-1.5 rounded-lg hover:bg-white/20 transition-colors duration-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}