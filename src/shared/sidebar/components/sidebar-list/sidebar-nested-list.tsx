import { cn } from '@/core/utils/class.utils';
import { DropdownVariants } from '@/core/variants/list.variants';
import Conditional from '@/shared/conditional';
import useSidebarChild from '@/shared/sidebar/hooks/use-sidebar-child';
import { ReactNode } from 'react';
import { useSidebarContext } from '../../hooks/use-sidebar-list-context';
import SidebarList from './sidebar-list';

const SidebarNestedList = ({ children }: { children?: ReactNode }) => {
  const { item, level, show, isDropdown } = useSidebarContext();
  if (!item) return null;

  const { id, is_have_component, is_parent } = item;
  const { dataSidebarChild } = useSidebarChild({
    parent_id: id!,
    is_parent: is_parent!,
  });

  if (!is_parent && !isDropdown) return null;

  const baseProps = {
    isChild: true,
    isDropdown: false,
    permissions: [] as string[],
    level: (level ?? 0) + 1,
  };

  return (
    <div className={cn(DropdownVariants({ show: !!show }))}>
      <div className="overflow-hidden flex flex-col gap-0.5">
        <Conditional condition={!!id && !!is_have_component}>
          <SidebarList
            {...baseProps}
            isDescendant
            item={{
              ...item,
              child: undefined,
              Image: undefined,
              image: undefined,
              is_parent: undefined,
            }}
          />
        </Conditional>

        <Conditional condition={!!id}>
          {dataSidebarChild?.map((childItem) => (
            <SidebarList
              key={childItem.id ?? childItem.path}
              {...baseProps}
              isDescendant={false}
              item={{
                ...childItem,
                child: undefined,
                Image: undefined,
                image: undefined,
              }}
            />
          ))}
        </Conditional>
        {children}
      </div>
    </div>
  );
};

export default SidebarNestedList;
