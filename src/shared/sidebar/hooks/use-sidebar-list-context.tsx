import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { SidebarProps } from '../utils/models';

export interface ISidebarListPropsContext extends Omit<SidebarProps, 'isActive' | 'isOpen'> {
  isLogout?: boolean;
}

export interface ISidebarListValueContext {
  isActive: boolean;
  show: boolean;
  openConfirm: boolean;
  openConfiguration: boolean;
}

export interface ISidebarListActionContext {
  setShow: Dispatch<SetStateAction<boolean>>;
  openModalConfirm: VoidFunction;
  closeModalConfirm: VoidFunction;
  openModalConfiguration: VoidFunction;
  closeModalConfiguration: VoidFunction;
}

export const SidebarListPropsContext = createContext<ISidebarListPropsContext | null>(null);
export const SidebarListValueContext = createContext<ISidebarListValueContext | null>(null);
export const SidebarListActionContext = createContext<ISidebarListActionContext | null>(null);

export const useSidebarContext = () => {
  const sidebarListPropsContext = useContext(SidebarListPropsContext);
  const sidebarListValueContext = useContext(SidebarListValueContext);
  const sidebarListActionContext = useContext(SidebarListActionContext);
  if (!sidebarListPropsContext && !sidebarListValueContext && !sidebarListActionContext) {
    throw new Error('Sidebar Context must be used within a Sidebar Provider');
  }
  return {
    ...sidebarListPropsContext,
    ...sidebarListValueContext,
    ...sidebarListActionContext,
  };
};
