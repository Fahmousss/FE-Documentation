import IconConfiguration from '@/shared/icon/configuration';
import IconGroup from '@/shared/icon/group';
import IconTrash from '@/shared/icon/trash';
import { Dropdown, DropdownProps, MenuProps } from 'antd';
import { MouseEvent, useState } from 'react';
import { useSidebarContext } from '../../hooks/use-sidebar-list-context';

const SidebarListMenu = () => {
  const { permissions, openModalConfiguration, openModalConfirm } = useSidebarContext();
  const [openDropdown, setOpenDropdown] = useState(true);

  const groupHandler = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const configHandler = () => openModalConfiguration?.();
  const deleteHandler = () => {
    openModalConfirm?.();
  };

  const items: MenuProps['items'] = [
    {
      key: '0',
      onClick: deleteHandler,
      label: 'Delete',
      icon: <IconTrash className="inline" mode={'danger'} width={14} height={14} />,
      disabled: !permissions?.includes('Delete'),
    },
    {
      key: '1',
      onClick: configHandler,
      label: 'Configuration',
      icon: <IconConfiguration className="inline" mode={'grey'} width={14} height={14} />,
      disabled: !permissions?.includes('Edit'),
    },
  ];
  const onMenuClick: MenuProps['onClick'] = (e) => {
    e.domEvent.preventDefault();
    e.domEvent.stopPropagation();
    setOpenDropdown((o) => !o);
  };

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenDropdown(nextOpen);
    }
  };
  return (
    <Dropdown
      trigger={['click']}
      placement="bottomLeft"
      openClassName="noDrag"
      overlayClassName="noDrag"
      rootClassName="noDrag"
      menu={{ items, onClick: onMenuClick }}
      className="noDrag"
      onOpenChange={handleOpenChange}
      open={openDropdown}
    >
      <IconGroup
        mode={'white'}
        width={16}
        height={16}
        className="noDrag hover:cursor-pointer"
        onClick={groupHandler}
      />
    </Dropdown>
  );
};

export default SidebarListMenu;
