import useColor from '@/core/hooks/use-color';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { setFooterHeight } from '@/core/store/slice/navbar.slice';
import { cn } from '@/core/utils/class.utils';
import Typography from '@/shared/typography';
import { useEffect, useRef } from 'react';

const LayoutFooter = () => {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { colorList } = useColor();
  const { isOpen, show } = useAppSelector((state) => state.sidebar);
  useEffect(() => {
    if (ref.current) {
      dispatch(setFooterHeight(ref.current.offsetHeight));
    }
  }, [ref]);
  return (
    <footer
      ref={ref}
      style={{
        borderTopWidth: 1,
        borderTopColor: colorList.nav.border,
        backgroundColor: colorList.nav.bg,
      }}
      className={cn(
        show ? (isOpen ? 'ml-[15%] w-[85%]' : 'ml-[10%] w-1/5') : 'ml-0 w-full',
        `  bottom-0 text-sm pl-6 py-2 transition-all duration-300 flex justify-end pr-[16px]`,
      )}
    >
      <Typography.P style={{ color: colorList['text-primary'] }}>
        Copyright © 2026 PT. Electrindo Inti Dinamika
      </Typography.P>
    </footer>
  );
};

export default LayoutFooter;
