import { createContext, useContext } from 'react';
import { ModalRootProps } from './types';

interface ModalValueContext
  extends Pick<
    ModalRootProps,
    'type' | 'open' | 'isLoading' | 'confirmLoading' | 'okText' | 'cancelText' | 'disabled'
  > {}

interface ModalHandleContext {
  onCancel: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  onOk: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}
export const ModalValueContext = createContext<ModalValueContext | undefined>(undefined);
export const ModalHandleContext = createContext<ModalHandleContext | undefined>(undefined);

export const useModalValueContext = () => {
  const context = useContext(ModalValueContext);
  if (!context) {
    throw new Error('useModalValue must be used within a ModalProvider');
  }
  return context;
};

export const useModalHandleContext = () => {
  const context = useContext(ModalHandleContext);
  if (!context) {
    throw new Error('useModalHandle must be used within a ModalProvider');
  }
  return context;
};
