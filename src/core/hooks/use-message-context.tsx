import { OpenMessageConfig } from '@/core/models/use-message.types';
import { createContext, ReactNode, useContext } from 'react';
import useMessage from './use-message';

export const MessageContext = createContext<MessageContext | null>(null);

export interface MessageContext {
  closeMessage: (key: string) => void;
  openMessage: (key: OpenMessageConfig) => void;
}

export function useMessageContext() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }

  return context;
}

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const { closeMessage, contextHolder, openMessage } = useMessage();
  return (
    <MessageContext.Provider value={{ closeMessage, openMessage }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
