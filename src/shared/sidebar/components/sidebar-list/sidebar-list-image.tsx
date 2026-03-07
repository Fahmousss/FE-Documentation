import useColor from '@/core/hooks/use-color';
import { useAppSelector } from '@/core/store/hooks';
import { cn } from '@/core/utils/class.utils';
import { listChildVariants } from '@/core/variants/list.variants';
import { useSidebarContext } from '../../hooks/use-sidebar-list-context';

const SidebarListImage = () => {
  const { colorList } = useColor();
  const { isOpen } = useAppSelector((state) => state.sidebar);
  const { item, isActive, isChild, isDropdown, isLogout } = useSidebarContext();
  const Image = item?.Image;
  const mode = isLogout
    ? colorList.form.error
    : isActive
      ? colorList.nav.fontSidebarActive
      : colorList.nav.fontSidebar;
  return Image ? (
    <div className="w-fit">
      <Image
        width={20}
        height={20}
        style={{
          stroke: mode,
        }}
        className={cn(
          listChildVariants({
            isOpen: !isChild || isOpen,
            isActive,
          }),
        )}
      />
    </div>
  ) : isDropdown ? null : (
    <div
      className={cn(
        'w-0.5 h-1 rounded-full',
      )}
    ></div>
  );
};

export default SidebarListImage;
