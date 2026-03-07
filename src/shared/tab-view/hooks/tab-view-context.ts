import { createContext, useContext } from 'react';
import { TabViewHandlerContextProps, TabViewValueContextProps } from '../utils/models';

export const TabViewValueContext = createContext<TabViewValueContextProps | null>(null);
export const TabViewHandlerContext = createContext<TabViewHandlerContextProps | null>(null);

export const useTabViewValueContext = () => {
  const context = useContext(TabViewValueContext);
  if (!context) {
    throw new Error(' must be used within a Tab View Value Provider');
  }
  return context;
};

export const useTabViewHandlerContext = () => {
  const context = useContext(TabViewHandlerContext);
  if (!context) {
    throw new Error(' must be used within a Tab View Handler Provider');
  }
  return context;
};
