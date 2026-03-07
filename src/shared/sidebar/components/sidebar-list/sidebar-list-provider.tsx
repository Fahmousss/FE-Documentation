import useModal from '@/core/hooks/use-modal';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { setActiveSidebar, setParentSidebar } from '@/core/store/slice/sidebar.slice';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  SidebarListActionContext,
  SidebarListValueContext,
  useSidebarContext,
} from '../../hooks/use-sidebar-list-context';

const SidebarListProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isOpen, active } = useAppSelector((state) => state.sidebar);
  const { item, isDropdown } = useSidebarContext();
  const [show, setShow] = useState(true);
  const { path } = item!;

  const {
    open: openConfiguration,
    openModal: openModalConfiguration,
    closeModal: closeModalConfiguration,
  } = useModal();
  const {
    open: openConfirm,
    openModal: openModalConfirm,
    closeModal: closeModalConfirm,
  } = useModal();

  const arrCheckedPath = path?.split('/').filter((path) => path !== '');
  const checkedPath = arrCheckedPath?.[arrCheckedPath.length - 1];
  const isActive = useMemo(() => {
    if (item?.is_parent || isDropdown) {
      return active.includes(checkedPath!);
    } else {
      return active[active.length - 1] === checkedPath;
    }
  }, [active]);

  useEffect(() => {
    const data = { ...item, Image: undefined };
    if ((item?.is_parent || isDropdown) && isActive) {
      dispatch(setParentSidebar([data]));
    }
    if (isActive) {
      const data = { ...item, Image: undefined };
      dispatch(setActiveSidebar(data));
    }
  }, [isActive, item?.is_parent]);

  useEffect(() => {
    if (!isOpen) setShow(false);
  }, [isOpen]);

  return (
    <SidebarListValueContext.Provider value={{ openConfiguration, openConfirm, show, isActive }}>
      <SidebarListActionContext.Provider
        value={{
          closeModalConfiguration,
          closeModalConfirm,
          openModalConfiguration,
          openModalConfirm,
          setShow,
        }}
      >
        {children}
      </SidebarListActionContext.Provider>
    </SidebarListValueContext.Provider>
  );
};

export default SidebarListProvider;
