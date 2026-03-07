import useColor from '@/core/hooks/use-color';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { setShowSidebar } from '@/core/store/slice/sidebar.slice';
import { cn } from '@/core/utils/class.utils';
import Typography from '@/shared/typography';
import Hamburger from './hamburger';

const NavbarBrand = () => {
  const { colorList } = useColor();
  const dispatch = useAppDispatch();
  const { show } = useAppSelector((state) => state.sidebar);
  const hamburgerClickHandler = () => {
    dispatch(setShowSidebar(!show));
  };
  return (
    <div className={cn(`flex items-center gap-2`)}>
      <Hamburger open={show} onClick={hamburgerClickHandler} />
      <Typography.Display1 style={{ color: colorList['text-primary'] }}>
        PT. Electrindo Inti Dinamika
      </Typography.Display1>
    </div>
    
  );
};

export default NavbarBrand;
