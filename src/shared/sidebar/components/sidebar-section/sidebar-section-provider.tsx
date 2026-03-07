import useModal from '@/core/hooks/use-modal';
import {
  SectionActionContext,
  SectionValueContext,
} from '@/shared/sidebar/hooks/use-section-context';
import useSidebar from '@/shared/sidebar/hooks/use-sidebar';
import { ReactNode, useEffect, useState } from 'react';
import { useSidebarContext } from '../../hooks/use-sidebar-context';
import { ISection } from '../../utils/models';

const SidebarSectionProvider = ({
  section,
  children,
}: {
  children: ReactNode;
  section: ISection;
}) => {
  const { search } = useSidebarContext();
  const [openSection, setOpenSection] = useState(true);
  const {
    open: openAddMenu,
    closeModal: closeModalAddMenu,
    openModal: openModalAddMenu,
  } = useModal();
  const {
    open: openEditSection,
    closeModal: closeModalEditSection,
    openModal: openModalEditSection,
  } = useModal();
  const {
    open: openDeleteSection,
    closeModal: closeModalDeleteSection,
    openModal: openModalDeleteSection,
  } = useModal();

  const { dataSidebar, refetchSidebar } = useSidebar({
    section_id: section?.id,
    dis: !!section?.id,
    search,
  });
  useEffect(() => {
    if ((dataSidebar?.length as number) > 0) setOpenSection(true);
  }, [dataSidebar]);
  return (
    <SectionValueContext.Provider
      value={{
        section,
        openSection,
        dataSidebar: dataSidebar || [],
        openAddMenu,
        openEditSection,
        openDeleteSection,
      }}
    >
      <SectionActionContext.Provider
        value={{
          setOpenSection,
          refetchSidebar,
          openModalAddMenu,
          closeModalAddMenu,
          openModalEditSection,
          closeModalEditSection,
          openModalDeleteSection,
          closeModalDeleteSection,
        }}
      >
        <div className="flex flex-col xl:py-2 2xl:py-4 border-b border-b-neutral-300">
          {children}
        </div>
      </SectionActionContext.Provider>
    </SectionValueContext.Provider>
  );
};

export default SidebarSectionProvider;
