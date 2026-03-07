import * as SignalR from '@microsoft/signalr';
import { ReactNode } from 'react';

export interface useSignalrConnectionProps {
  url: string;
}

export interface SignalRContextProps {
  connectionState: SignalR.HubConnectionState;
  addListener: (eventName: string, callback: (...args: never[]) => void) => void;
  removeListener: (eventName: string) => void;
  sendEvent: (methodName: string, ...args: never[]) => Promise<void>;
  invokeEvent: (methodName: string, ...args: never[]) => Promise<unknown>;
}

export interface SignalRProviderProps {
  url: string;
  children: ReactNode;
}
