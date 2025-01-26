import React from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isTyping: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  isTyping,
  inputRef
}: ChatInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-4 bg-white border-t border-gray-200 shrink-0"
    >
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Still et spørsmål..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003057] focus:border-transparent"
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={isTyping || !value.trim()}
          className={cn(
            "p-2 rounded-xl bg-[#003057] text-white",
            "hover:bg-[#002543] transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}