/* eslint-disable @typescript-eslint/no-explicit-any */
import { SIGNALR_URL } from '@/core/constant/config.constant';
import * as SignalR from '@microsoft/signalr';

export const connection = new SignalR.HubConnectionBuilder()
  .withUrl(SIGNALR_URL)
  .withAutomaticReconnect()
  .withHubProtocol(new SignalR.JsonHubProtocol())
  .configureLogging(SignalR.LogLevel.Information)
  .build();

export const connect = async () => {
  if (connection.state === SignalR.HubConnectionState.Disconnected) {
    try {
      await connection.start();
    } catch (err) {
      console.error('Error connecting to SignalR:', err);
    }
  }
};

export const addEventListener = (eventName: string, callback: (...args: any[]) => void) => {
  connection.on(eventName, callback);
};

export const removeEventListener = (eventName: string) => {
  connection.off(eventName);
};

export const disconnect = async () => {
  if (connection.state === SignalR.HubConnectionState.Connected) {
    try {
      await connection.stop();
    } catch (err) {
      console.error('Error disconnecting from SignalR:', err);
    }
  }
};

// Mengirimkan event ke server
export const sendEvent = async (methodName: string, ...args: any[]) => {
  if (connection.state === SignalR.HubConnectionState.Connected) {
    try {
      await connection.send(methodName, ...args);
    } catch (error) {
      console.error(`Error sending event "${methodName}":`, error);
    }
  } else {
    console.warn('SignalR connection is not established. Unable to send event.');
  }
};

// Mengirim event dengan respons (menggunakan invoke)
export const invokeEvent = async (methodName: string, ...args: any[]) => {
  if (connection.state === SignalR.HubConnectionState.Connected) {
    try {
      const result = await connection.invoke(methodName, ...args);
      return result;
    } catch (error) {
      console.error(`Error invoking event "${methodName}":`, error);
    }
  } else {
    console.warn('SignalR connection is not established. Unable to invoke event.');
  }
};
