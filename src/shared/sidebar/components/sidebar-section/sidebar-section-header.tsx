import useColor from '@/core/hooks/use-color';
import { cn } from '@/core/utils/class.utils';
import { listChildVariants } from '@/core/variants/list.variants';
import Arrow from '@/shared/icon/arrow';
import { useSectionContext } from '@/shared/sidebar/hooks/use-section-context';
import Typography from '@/shared/typography';
import { MouseEvent } from 'react';
import SidebarSectionHeaderMenu from './sidebar-section-header-menu';

const SidebarSectionHeader = () => {
  const { colorList } = useColor();
  const { setOpenSection, section, openSection } = useSectionContext();
  const sectionHandler = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setOpenSection?.((prev) => !prev);
  };
  const arrowHandler = (event: MouseEvent) => {
    event.stopPropagation();
    setOpenSection?.((prev) => !prev);
  };
  return (
    <div
      onClick={sectionHandler}
      className="max-w-4/5 flex items-center justify-between px-4 py-2 hover:cursor-pointer"
    >
      <Typography.P
        className="font-normal"
        style={{
          color: colorList['text-secondary'],
        }}
      >
        {section?.name.toUpperCase()}
      </Typography.P>
      <div className="flex items-center gap-2">
        {/* <Arrow
          width={18}
          height={18}
          style={{
            stroke: colorList['text-secondary'],
          }}
          onClick={arrowHandler}
          className={cn(
            `transition-all duration-300 hover:cursor-pointer ease-in-out`,
            !openSection && 'rotate-180',
            listChildVariants({ isOpen: true }),
          )}
        /> */}
        <SidebarSectionHeaderMenu />
      </div>
    </div>
  );
};

export default SidebarSectionHeader;
