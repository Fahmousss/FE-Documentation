import { USER_ROLE } from '@/core/constant/config.constant';
import RoleBasedComponent from '@/shared/authentication/role-based-component';
import IconConfiguration from '@/shared/icon/configuration';
import IconGroup from '@/shared/icon/group';
import IconPlus from '@/shared/icon/plus';
import IconTrash from '@/shared/icon/trash';
import { useSectionContext } from '@/shared/sidebar/hooks/use-section-context';
import { Dropdown, DropdownProps, MenuProps } from 'antd';
import { useState } from 'react';

const SidebarSectionHeaderMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { openModalAddMenu, openModalEditSection, openModalDeleteSection, section } =
    useSectionContext();

  if (!section.id) return null;

  const deleteHandler = () => openModalDeleteSection?.();
  const addHandler = () => openModalAddMenu?.();
  const editHandler = () => openModalEditSection?.();

  const onMenuClick: MenuProps['onClick'] = (e) => {
    e.domEvent.preventDefault();
    e.domEvent.stopPropagation();
    setOpenMenu((o) => !o);
  };

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenMenu(nextOpen);
    }
  };
  const items: MenuProps['items'] = [
    {
      key: '2',
      onClick: addHandler,
      label: 'Add Menu',
      icon: <IconPlus className="inline" mode={'grey'} width={14} height={14} />,
    },
    {
      key: '1',
      onClick: editHandler,
      label: 'Edit Section',
      icon: <IconConfiguration className="inline" mode={'grey'} width={14} height={14} />,
    },
    {
      key: '0',
      onClick: deleteHandler,
      label: 'Delete Section',
      icon: <IconTrash className="inline" mode={'danger'} width={14} height={14} />,
    },
  ];
  return (
    <RoleBasedComponent role={USER_ROLE.SUPER_ADMIN}>
      <Dropdown
        trigger={['click']}
        placement="bottomLeft"
        openClassName="noDrag"
        overlayClassName="noDrag"
        rootClassName="noDrag"
        menu={{ items, onClick: onMenuClick }}
        className="noDrag"
        onOpenChange={handleOpenChange}
        open={openMenu}
      >
        <IconGroup
          mode="white"
          width={16}
          height={16}
          onClick={(e) => e.stopPropagation()}
          className="noDrag hover:cursor-pointer"
        />
      </Dropdown>
    </RoleBasedComponent>
  );
};

export default SidebarSectionHeaderMenu;
