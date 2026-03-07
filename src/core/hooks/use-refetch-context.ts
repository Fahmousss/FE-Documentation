import { createContext, useContext } from 'react';

interface RefetchContext {
  refetch: () => void;
}

export const RefetchContext = createContext<RefetchContext | undefined>(undefined);

export const useRefetchContext = () => {
  const context = useContext(RefetchContext);
  if (!context) {
    throw new Error('useRefetch must be used within a RefetchProvider');
  }
  return context;
};
