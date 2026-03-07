import { Tooltip } from 'antd';
import { ReactNode } from 'react';
import { useSidebarContext } from '../../hooks/use-sidebar-list-context';

const SidebarListTooltip = ({ children }: { children: ReactNode }) => {
  const { item } = useSidebarContext();
  const name = item?.name;
  if ((name?.length as number) > 15) {
    return (
      <Tooltip className="w-full" title={name}>
        {children}
      </Tooltip>
    );
  }
  return <>{children}</>;
};

export default SidebarListTooltip;
