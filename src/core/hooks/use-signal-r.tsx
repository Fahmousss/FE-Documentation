import { SIGNALR_URL } from '@/core/constant/config.constant';
import * as SignalR from '@microsoft/signalr';
import React, { createContext, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSignalrConnection from './use-signalr-connection';

export interface SignalRContextProps {
  connectionState: SignalR.HubConnectionState;
  addListener: (eventName: string, callback: (...args: never[]) => void) => void;
  removeListener: (eventName: string) => void;
  sendEvent: (methodName: string, ...args: never[]) => Promise<void>;
  invokeEvent: (methodName: string, ...args: never[]) => Promise<unknown>;
}

export const SignalRContext = createContext<SignalRContextProps | undefined>(undefined);

export const SignalRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { id } = useParams();

  const {
    connect,
    sendEvent,
    disconnect,
    invokeEvent,
    connectionState,
    addEventListener,
    removeEventListener,
  } = useSignalrConnection({
    url: SIGNALR_URL,
  });

  useEffect(() => {
    let isMounted = true;

    const initializeConnection = async () => {
      // Disconnect existing connection
      await disconnect();

      // Prevent unnecessary reinitialization
      if (!isMounted) return;

      // Connect to the new connection
      await connect();
    };

    initializeConnection();

    return () => {
      isMounted = false;
      disconnect();
    };
  }, [id]);

  const addListener = (eventName: string, callback: (...args: never[]) => void) => {
    addEventListener(eventName, callback);
  };

  const removeListener = (eventName: string) => {
    removeEventListener(eventName);
  };

  const sendEventWrapper = async (methodName: string, ...args: never[]) => {
    await sendEvent(methodName, ...args);
  };

  const invokeEventWrapper = async (methodName: string, ...args: never[]) => {
    return await invokeEvent(methodName, ...args);
  };

  return (
    <SignalRContext.Provider
      value={{
        connectionState,
        addListener,
        removeListener,
        sendEvent: sendEventWrapper,
        invokeEvent: invokeEventWrapper,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error('useSignalR must be used within a SignalRProvider');
  }
  return context;
};
