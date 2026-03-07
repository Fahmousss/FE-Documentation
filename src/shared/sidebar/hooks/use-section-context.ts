import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { ISection, ISidebarServer } from '../utils/models';

export interface SectionValueContext {
  openSection: boolean;
  openAddMenu: boolean;
  openEditSection: boolean;
  openDeleteSection: boolean;
  section: ISection;
  dataSidebar: ISidebarServer[];
}

export interface SectionActionContext {
  setOpenSection: Dispatch<SetStateAction<boolean>>;
  refetchSidebar: VoidFunction;
  openModalAddMenu: VoidFunction;
  closeModalAddMenu: VoidFunction;
  openModalEditSection: VoidFunction;
  closeModalEditSection: VoidFunction;
  openModalDeleteSection: VoidFunction;
  closeModalDeleteSection: VoidFunction;
}

export const SectionValueContext = createContext<SectionValueContext | null>(null);
export const SectionActionContext = createContext<SectionActionContext | null>(null);

export const useSectionContext = () => {
  const valueContext = useContext(SectionValueContext);
  const actionContext = useContext(SectionActionContext);
  if (!valueContext && !actionContext) {
    // throw new Error("Section Context must be used within a Section Provider");
    return {} as SectionValueContext & SectionActionContext;
  }
  return { ...valueContext, ...actionContext };
};
