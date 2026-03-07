import useColor from '@/core/hooks/use-color';
import { useAppSelector } from '@/core/store/hooks';
import { cn } from '@/core/utils/class.utils';
import { listChildVariants, listVariants } from '@/core/variants/list.variants';
import Conditional from '@/shared/conditional';
import Arrow from '@/shared/icon/arrow';
import Typography from '@/shared/typography';
import { CSSProperties, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSidebarContext } from '../../hooks/use-sidebar-list-context';
import { SidebarListHeaderProps } from '../../utils/models';
import SidebarListImage from './sidebar-list-image';
import SidebarListMenu from './sidebar-list-menu';
import SidebarListTooltip from './sidebar-list-tooltip';

const SidebarListHeader = ({ className, onClick, ...props }: SidebarListHeaderProps) => {
  const { colorList } = useColor();
  const { isOpen } = useAppSelector((state) => state.sidebar);
  const { isActive, level, isChild, item, isDropdown, isDescendant, setShow, show, isLogout } =
    useSidebarContext();

  const id = item?.id;
  const is_parent = item?.is_parent;
  const hasChildren = item.child && item.child.length > 0;
  const parent = hasChildren && !isChild;
  const path = item?.path;

  const style: CSSProperties = {
    paddingLeft: level ? `${18 + level * 9}px` : '',
    backgroundColor: !parent && isActive ? colorList.nav.sidebarAccent : '',
    '--hover-bg': colorList.nav.sidebarAccent,
  } as CSSProperties;

  const typographyStyle: CSSProperties = {
    color: isLogout
      ? colorList.form.error
      : isActive
        ? colorList.nav.fontSidebarActive
        : colorList.nav.fontSidebar,
  };

  const arrowHandler = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setShow?.((prev) => !prev);
  };

  const linkHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    if (is_parent || isDropdown) {
      e.preventDefault();
      e.stopPropagation();
      setShow?.((prev) => !prev);
    }
    onClick?.(e);
  };

  return (
    <Link
      to={path!}
      onClick={linkHandler}
      className={cn(
        listVariants({ isOpen }),
        'w-full px-4 flex items-center justify-between',
        Image ? 'text-base' : 'text-sm',
        className,
      )}
      {...props}
    >
      <SidebarListTooltip>
        <div
          style={style}
          className={cn(
            `flex w-full items-center justify-between px-2 py-2 2xl:py-3 rounded-md sidebar-hover`,
          )}
        >
          <div className="max-w-[80%] flex gap-2 items-center">
            <SidebarListImage />
            <Typography.H6
              style={typographyStyle}
              className={cn('w-full truncate', listChildVariants({ isOpen, isActive }))}
            >
              {item?.name}
            </Typography.H6>
          </div>
          <Conditional condition={!!id || isDropdown}>
            <div className="flex items-center gap-2">
              <Conditional condition={is_parent || isDropdown}>
                <Arrow
                  width={18}
                  height={18}
                  onClick={arrowHandler}
                  style={{
                    stroke: colorList.nav.fontSidebar,
                  }}
                  className={cn(
                    `transition-all duration-300`,
                    listChildVariants({ isOpen, isActive }),
                    {
                      'rotate-180': !show,
                    },
                  )}
                />
              </Conditional>
              <Conditional condition={!isDescendant && !!id}>
                <SidebarListMenu />
              </Conditional>
            </div>
          </Conditional>
        </div>
      </SidebarListTooltip>
    </Link>
  );
};

export default SidebarListHeader;
