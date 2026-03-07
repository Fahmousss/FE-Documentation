import usePath from '@/core/hooks/use-path';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { setActive } from '@/core/store/slice/sidebar.slice';
import { cn } from '@/core/utils/class.utils';
import { ReactNode, useEffect, useState } from 'react';
import useColor from '../../../core/hooks/use-color';
import useSection from '../hooks/use-section';
import { SidebarContext } from '../hooks/use-sidebar-context';

const SidebarWrapper = ({ children }: { children: ReactNode }) => {
  const { colorList } = useColor();
  const [search, setSearch] = useState('');
  const { dataSection, refetchSection } = useSection();
  const dispatch = useAppDispatch();
  const path = usePath();
  const { isOpen, show } = useAppSelector((state) => state.sidebar);
  useEffect(() => {
    dispatch(setActive(path));
  }, [path]);

  return (
    <SidebarContext.Provider
      value={{
        search,
        setSearch,
        dataSection: dataSection ?? [],
        refetchSection,
      }}
    >
      <div
        className={cn(
          isOpen ? 'w-[15%]' : 'w-[10%]',
          show ? '' : '-translate-x-full',
          'fixed h-screen flex flex-col transition-all duration-[500ms]',
        )}
      >
        <div
          style={{
            backgroundColor: colorList.nav.bg,
            borderRightWidth: 1,
            borderRightColor: colorList.nav.border,
          }}
          className="relative h-screen flex flex-col items-start"
        >
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default SidebarWrapper;
