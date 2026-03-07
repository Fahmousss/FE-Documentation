import ModalConfirm from '@/shared/modal/modal-confirm';
import ModalConfigurationLayoutSidebar from '@/shared/sidebar/components/modal-configuration-sidebar';
import { useSectionContext } from '@/shared/sidebar/hooks/use-section-context';
import useSidebarMutation from '@/shared/sidebar/hooks/use-sidebar-mutation';
import { useNavigate } from 'react-router-dom';
import { useSidebarContext } from '../../hooks/use-sidebar-list-context';

const SidebarListModals = () => {
  const navigate = useNavigate();
  const {
    item,
    openConfiguration,
    closeModalConfiguration,
    openConfirm,
    closeModalConfirm,
    isActive,
  } = useSidebarContext();
  const { refetchSidebar } = useSectionContext();
  const { deleteSidebar } = useSidebarMutation();
  const onDeleteHandler = () => {
    if (item?.id) {
      deleteSidebar(item.id).then(() => {
        closeModalConfirm?.();
        refetchSidebar?.();
        if (isActive) {
          navigate('/');
        }
      });
    }
  };
  return (
    <>
      <ModalConfirm
        open={openConfirm}
        onCancel={closeModalConfirm}
        onOk={onDeleteHandler}
        message={`Are you sure you want to delete this page? This action cannot be undone.`}
        okText="Yes, Delete"
        title="Confirmation"
      />
      <ModalConfigurationLayoutSidebar
        open={openConfiguration!}
        closeModal={closeModalConfiguration!}
        item={item}
      />
    </>
  );
};

export default SidebarListModals;
