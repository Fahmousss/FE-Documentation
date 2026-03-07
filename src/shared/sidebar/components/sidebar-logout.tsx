import { ACCESS_TOKEN, REFRESH_TOKEN, ROLE, USERNAME } from '@/core/constant/config.constant';
import IconLogout from '@/shared/icon/logout';
import SidebarList from '@/shared/sidebar/components/sidebar-list/sidebar-list';
import Cookies from 'js-cookie';

const SidebarLogout = () => {
  const handleClickLogout = () => {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    Cookies.remove(USERNAME);
    Cookies.remove(ROLE);
  };
  return (
    <SidebarList
      isLogout
      level={0}
      isChild={false}
      className="mt-2 -ml-1.5"
      permissions={[]}
      isDropdown={false}
      isDescendant={false}
      onClick={handleClickLogout}
      item={{ name: 'Logout', Image: IconLogout, path: '/login' }}
    />
  );
};

export default SidebarLogout;
