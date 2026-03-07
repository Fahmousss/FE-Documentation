import useColor from '@/core/hooks/use-color';
import { useAppSelector } from '@/core/store/hooks';
import { cn } from '@/core/utils/class.utils';
import PageLoader from '@/shared/loader/page-loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const LayoutContent = () => {
  const { colorList } = useColor();
  const { isOpen, show } = useAppSelector((state) => state.sidebar);
  const { navbarHeight, footerHeight, showNavbar } = useAppSelector((state) => state.navbar);
  const height = showNavbar
    ? `calc(100vh - ${navbarHeight}px - ${footerHeight}px)`
    : `calc(100vh - ${footerHeight}px)`;
  const marginTop = showNavbar ? navbarHeight : 0;
  return (
    <div
      style={{
        minHeight: height,
        marginTop,
        backgroundColor: colorList.bg,
      }}
      className={cn(
        "p-4 relative transition-all duration-500 flex flex-col",
        show ? (isOpen ? "ml-[15%]" : "ml-[10%]") : "ml-0"
      )}
    >
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default LayoutContent;
