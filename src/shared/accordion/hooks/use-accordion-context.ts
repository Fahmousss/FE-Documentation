import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from 'react';

type AccordionValueContext = {
  open: boolean;
  first?: boolean;
  last?: boolean;
  title?: string;
  content?: ReactNode;
};

type AccordionHandleContext = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AccordionValueContext = createContext<AccordionValueContext | null>(null);
export const AccordionHandleContext = createContext<AccordionHandleContext | null>(null);

export const useAccordionValueContext = () => {
  const context = useContext(AccordionValueContext);
  if (!context) {
    throw new Error('usePurchase must be used within a PurchaseProvider');
  }
  return context;
};

export const useAccordionHandleContext = () => {
  const context = useContext(AccordionHandleContext);
  if (!context) {
    throw new Error('usePurchase must be used within a PurchaseProvider');
  }
  return context;
};
