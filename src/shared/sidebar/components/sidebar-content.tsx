import { LIST_SECTION } from '@/core/constant/section.constant';
import { useSidebarContext } from '../hooks/use-sidebar-context';
import SidebarSection from './sidebar-section';

const SidebarContent = () => {
  const { dataSection } = useSidebarContext();
  const sections = dataSection && dataSection.length > 0 ? dataSection : LIST_SECTION;

  return (
    <div className="w-full h-fit overflow-y-auto flex flex-col gap-0.5">
      {sections.map((section, index) => (
        <SidebarSection section={section} key={`section-${index}-${section.id ?? 'default'}`} />
      ))}
    </div>
  );
};

export default SidebarContent;