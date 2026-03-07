import * as SignalR from '@microsoft/signalr';
import { useRef, useState } from 'react';

interface useSignalrConnectionProps {
  url: string;
}

export default function useSignalrConnection({ url }: useSignalrConnectionProps) {
  const connection = useRef(
    new SignalR.HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .withHubProtocol(new SignalR.JsonHubProtocol())
      .configureLogging(SignalR.LogLevel.Information)
      .build(),
  ).current;

  const [connectionState, setConnectionState] = useState(SignalR.HubConnectionState.Disconnected);

  const connect = async () => {
    if (connection.state === SignalR.HubConnectionState.Disconnected) {
      try {
        await connection.start();
        setConnectionState(SignalR.HubConnectionState.Connected);
      } catch (err) {
        throw new Error('Error connecting to SignalR:' + err);
      }
    }
  };

  const disconnect = async () => {
    if (connection.state === SignalR.HubConnectionState.Connected) {
      try {
        await connection.stop();
        setConnectionState(SignalR.HubConnectionState.Disconnected);
      } catch (err) {
        throw new Error('Error connecting to SignalR:' + err);
      }
    }
  };

  const addEventListener = (eventName: string, callback: (...args: never[]) => void) => {
    connection.on(eventName, callback);
  };

  const removeEventListener = (eventName: string) => {
    connection.off(eventName);
  };

  const sendEvent = async (methodName: string, ...args: never[]) => {
    if (connection.state === SignalR.HubConnectionState.Connected) {
      try {
        await connection.send(methodName, ...args);
      } catch (error) {
        throw new Error('Error Sending Event:' + error);
      }
    } else {
      throw new Error('SignalR connection is not established. Unable to send event.');
    }
  };

  const invokeEvent = async (methodName: string, ...args: never[]) => {
    if (connection.state === SignalR.HubConnectionState.Connected) {
      try {
        const result = await connection.invoke(methodName, ...args);
        return result;
      } catch (error) {
        throw new Error(`Error invoking event "${methodName}":` + error);
      }
    } else {
      throw new Error('SignalR connection is not established. Unable to invoke event.');
    }
  };

  return {
    connectionState,
    connect,
    disconnect,
    addEventListener,
    removeEventListener,
    sendEvent,
    invokeEvent,
  };
}
