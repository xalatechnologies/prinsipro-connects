import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@hooks/useChat';
import { useClickOutside } from '@hooks/useClickOutside';
import { ChatHeader } from '@components/chat/ChatHeader';
import { ChatMessages } from '@components/chat/ChatMessages';
import { ChatInput } from '@components/chat/ChatInput';
import { FloatingButton } from '@components/chat/FloatingButton';

const chatVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 }
};

interface ChatBotProps {
  onNavigate?: (type: string, id: string) => void;
}

export function ChatBot({ onNavigate }: ChatBotProps) {
  const [input, setInput] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const { messages, isTyping, handleSubmit, clearMessages, addMessage, setIsTyping } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useClickOutside(chatRef, () => {
    if (isOpen) {
      handleClose();
    }
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage({
          id: 'welcome',
          type: 'bot',
          content: `Hei! Jeg er din arkitekturassistent. Hvordan kan jeg hjelpe deg i dag?`,
          timestamp: new Date(),
          status: 'sent'
        });
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length, addMessage, setIsTyping]);

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      e.preventDefault();
      const type = target.getAttribute('data-type');
      const id = target.getAttribute('data-id');
      if (type && id && onNavigate) {
        onNavigate(type, id);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleClose = () => {
    setIsOpen(false);
    clearMessages();
  };

  return (
    <AnimatePresence mode="wait">
      {!isOpen ? (
        <FloatingButton onClick={handleOpen} />
      ) : (
        <motion.div
          key="chat-window"
          ref={chatRef}
          variants={chatVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed bottom-6 right-6 w-[450px] h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col"
        >
          <ChatHeader isTyping={isTyping} onClose={handleClose} />
          
          <div className="flex-1 overflow-hidden flex flex-col">
            <ChatMessages
              messages={messages}
              isTyping={isTyping}
              onLinkClick={handleLinkClick}
              messagesEndRef={messagesEndRef}
            />
            
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onSubmit={handleFormSubmit}
              onKeyDown={handleKeyDown}
              isTyping={isTyping}
              inputRef={inputRef}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}