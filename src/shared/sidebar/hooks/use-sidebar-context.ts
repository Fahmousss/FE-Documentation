import { createContext, useContext } from 'react';
import { ISection } from '../utils/models';

export interface SidebarContext {
  search: string;
  setSearch: (value: string) => void;
  dataSection: ISection[];
  // refetchSection: () => void;
}

export const SidebarContext = createContext<SidebarContext | null>(null);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('LayoutSidebar Context must be used within a Layout Sidebar Provider');
  }
  return context;
};
