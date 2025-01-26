import { useState, useCallback } from 'react';
import { Message } from '@types/chat';
import { useDataService } from '@hooks/useDataService';
import { generateResponse } from '@utils/chatbot';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const dataService = useDataService();

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handleSubmit = useCallback(async (input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      status: 'sent'
    };

    addMessage(userMessage);
    setIsTyping(true);

    try {
      const areas = await dataService.getAreas();
      const response = await generateResponse(input, areas);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        status: 'sent'
      };

      addMessage(botMessage);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Beklager, det oppstod en feil. Vennligst prøv igjen.',
        timestamp: new Date(),
        status: 'error'
      };
      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  }, [addMessage, dataService]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isTyping,
    setIsTyping,
    handleSubmit,
    clearMessages,
    addMessage
  };
}