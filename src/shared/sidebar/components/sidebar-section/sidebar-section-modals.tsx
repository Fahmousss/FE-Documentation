import ModalDelete from '@/shared/modal/modal-delete';
import { useSectionContext } from '@/shared/sidebar/hooks/use-section-context';
import useSectionMutation from '@/shared/sidebar/hooks/use-section-mutation';
import { useSidebarContext } from '../../hooks/use-sidebar-context';
import ModalConfigurationLayoutSidebar from '../modal-configuration-sidebar';
import ModalSection from './modal-section';

const SidebarSectionModals = () => {
  const { deleteSection } = useSectionMutation();
  const { refetchSection } = useSidebarContext();
  const {
    section,
    openAddMenu,
    openEditSection,
    openDeleteSection,
    closeModalAddMenu,
    closeModalEditSection,
    closeModalDeleteSection,
  } = useSectionContext();

  const onDeleteHandler = () => {
    deleteSection(section?.id as string)
      .then(() => refetchSection())
      .finally(() => closeModalDeleteSection?.());
  };

  return (
    <>
      <ModalConfigurationLayoutSidebar open={openAddMenu!} closeModal={closeModalAddMenu!} />
      <ModalDelete
        onOk={onDeleteHandler}
        open={openDeleteSection}
        onCancel={closeModalDeleteSection}
      />
      <ModalSection open={openEditSection!} closeModal={closeModalEditSection!} />
    </>
  );
};

export default SidebarSectionModals;
