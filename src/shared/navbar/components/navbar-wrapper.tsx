import useColor from '@/core/hooks/use-color';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { setNavbarHeight } from '@/core/store/slice/navbar.slice';
import { cn } from '@/core/utils/class.utils';
import BreadCrumbEID from '@/shared/breadcrumb';
import React, { useEffect, useRef } from 'react';

const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const { colorList } = useColor();
  const { show } = useAppSelector((state) => state.sidebar);
  const { showNavbar } = useAppSelector((state) => state.navbar);

  useEffect(() => {
    if (!ref.current) return;
    dispatch(setNavbarHeight(ref.current.offsetHeight));
  }, [ref]);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: colorList.nav.bg,
        borderBottomWidth: 1,
        borderBottomColor: colorList.nav.border,
      }}
      className={cn(
        `fixed z-[1000] px-5 pb-4 pt-[15px] transition-all duration-500 flex justify-between items-center flex-shrink-0`,
        show ? 'ml-[15%] w-[85%]' : 'ml-0 w-full',
        showNavbar ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      {children}
    </div> 
    
  );
};

export default NavbarWrapper;
