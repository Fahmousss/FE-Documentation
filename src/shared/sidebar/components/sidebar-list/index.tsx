import { SidebarListRootProps } from '../../utils/models';
import SidebarList from './sidebar-list';

const SidebarListRoot = ({ item, dataSidebar, level = 0 }: SidebarListRootProps) => {
  const permissions = dataSidebar?.permissions as string[];
  const hasChildren = item.child?.length > 0;

  return (
    <SidebarList
      item={item}
      level={level}
      permissions={permissions}
      isChild={level > 0}
      isDescendant={false}
      isDropdown={hasChildren}
    >
      {hasChildren &&
        item.child!.map((child) => (
          <SidebarListRoot
            key={child.path}
            item={child}
            level={level + 1}
            dataSidebar={dataSidebar}
            permissions={permissions}
          />
        ))}
    </SidebarList>
  );
};

export default SidebarListRoot;
