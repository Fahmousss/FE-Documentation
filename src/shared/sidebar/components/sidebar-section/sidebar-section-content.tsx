import {
  LIST_SIDEBAR,
  LIST_SIDEBAR_MAINTENANCE,
  LIST_SIDEBAR_MASTER_DATA,
  LIST_SIDEBAR_REPORT,
  LIST_SIDEBAR_USER_MANAGEMENT,
} from '@/core/constant/sidebar.constant';
import { cn } from '@/core/utils/class.utils';
import { DropdownVariants } from '@/core/variants/list.variants';
import SidebarComp from '@/shared/sidebar/components/sidebar-list';
import { useSectionContext } from '@/shared/sidebar/hooks/use-section-context';
import { useMemo } from 'react';
import { generateSidebar } from '../../utils/form';
import { ISidebarServer } from '../../utils/models';

const SidebarSectionContent = () => {
  const { openSection, section, dataSidebar } = useSectionContext();

  const children = useMemo(() => {
    return dataSidebar?.map((item, index) => {
      return (
        <SidebarComp
          item={generateSidebar(item)}
          dataSidebar={item}
          key={`list-${index}-${item.id}`}
          level={0}
          permissions={[]}
        />
      );
    });
  }, [dataSidebar]);

  return (
    <div className={cn(DropdownVariants({ show: openSection }))}>
      <div className="overflow-hidden">
        <div className="w-full flex flex-col gap-0.5 pt-2">
          {section.name.toLowerCase() === 'application'
            ? LIST_SIDEBAR.map((item, index) => {
                return (
                  <SidebarComp
                    item={item}
                    key={`list-${index}`}
                    dataSidebar={{} as ISidebarServer}
                    level={0}
                    permissions={[]}
                  />
                );
              })
            : null}
          {section.name.toLowerCase() == 'management'
            ? LIST_SIDEBAR_USER_MANAGEMENT.map((item, index) => {
                return (
                  <SidebarComp
                    item={item}
                    key={`list-${index}`}
                    dataSidebar={{} as ISidebarServer}
                    level={0}
                    permissions={[]}
                  />
                );
              })
            : null}
          {section.name.toLowerCase() == 'maintenance'
            ? LIST_SIDEBAR_MAINTENANCE.map((item, index) => {
                return (
                  <SidebarComp
                    item={item}
                    key={`list-${index}`}
                    dataSidebar={{} as ISidebarServer}
                    level={0}
                    permissions={[]}
                  />
                );
              })
            : null}
          {section.name.toLowerCase() == 'database'
            ? LIST_SIDEBAR_MASTER_DATA.map((item, index) => {
                return (
                  <SidebarComp
                    item={item}
                    key={`list-${index}`}
                    dataSidebar={{} as ISidebarServer}
                    level={0}
                    permissions={[]}
                  />
                );
              })
            : null}
          {section.name.toLowerCase() == 'report'
            ? LIST_SIDEBAR_REPORT.map((item, index) => {
                return (
                  <SidebarComp
                    item={item}
                    key={`list-${index}`}
                    dataSidebar={{} as ISidebarServer}
                    level={0}
                    permissions={[]}
                  />
                );
              })
            : null}
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarSectionContent;
