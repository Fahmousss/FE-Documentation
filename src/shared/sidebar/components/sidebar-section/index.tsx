import { SidebarSectionProps } from '../../utils/models';
import SidebarSectionContent from './sidebar-section-content';
import SidebarSectionHeader from './sidebar-section-header';
import SidebarSectionModals from './sidebar-section-modals';
import SidebarSectionProvider from './sidebar-section-provider';

const SidebarSection = ({ section }: SidebarSectionProps) => {
  return (
    <SidebarSectionProvider section={section}>
      <SidebarSectionHeader />
      <SidebarSectionContent />
      <SidebarSectionModals />
    </SidebarSectionProvider>
  );
};

export default SidebarSection;
