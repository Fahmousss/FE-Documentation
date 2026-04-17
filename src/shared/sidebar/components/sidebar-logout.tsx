import useAuth from '@/core/hooks/use-auth';
import IconLogout from '@/shared/icon/logout';
import SidebarList from '@/shared/sidebar/components/sidebar-list/sidebar-list';

const SidebarLogout = () => {
  const { logout } = useAuth();

  return (
    <SidebarList
      isLogout
      level={0}
      isChild={false}
      className="mt-2 -ml-1.5"
      permissions={[]}
      isDropdown={false}
      isDescendant={false}
      onClick={logout}
      item={{ name: 'Logout', Image: IconLogout }}
    />
  );
};

export default SidebarLogout;
