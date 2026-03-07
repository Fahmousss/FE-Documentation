import SidebarContent from './components/sidebar-content';
import SidebarHeader from './components/sidebar-header';
import SidebarLogout from './components/sidebar-logout';
import SidebarWrapper from './components/sidebar-wrapper';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarHeader />
      <SidebarContent />
      <SidebarLogout />
    </SidebarWrapper>
  );
};

export default Sidebar;
