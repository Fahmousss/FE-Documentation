import { SidebarListPropsContext } from '../../hooks/use-sidebar-list-context';
import { SidebarListProps } from '../../utils/models';
import SidebarHeader from './sidebar-list-header';
import SidebarModals from './sidebar-list-modals';
import SidebarProvider from './sidebar-list-provider';
import SidebarNestedList from './sidebar-nested-list';

const SidebarList = ({
  isChild,
  children,
  item,
  level,
  permissions,
  isDescendant,
  isDropdown,
  isLogout,
  ...rest
}: SidebarListProps) => {
  return (
    <SidebarListPropsContext.Provider
      value={{
        item,
        level,
        isChild,
        permissions,
        isDescendant,
        isDropdown,
        isLogout,
      }}
    >
      <SidebarProvider>
        <div className="w-full flex flex-col">
          <SidebarHeader {...rest} />
          <SidebarNestedList>{children}</SidebarNestedList>
        </div>
        <SidebarModals />
      </SidebarProvider>
    </SidebarListPropsContext.Provider>
  );
};

export default SidebarList;
