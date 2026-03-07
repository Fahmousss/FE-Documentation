import useColor from '@/core/hooks/use-color';
import { cn } from '@/core/utils/class.utils';
import { CSSProperties } from 'react';

interface Hamburger {
  open: boolean;
  onClick: () => void;
}

const Hamburger = ({ open, onClick }: Hamburger) => {
  const { colorList } = useColor();
  const style: CSSProperties = {
    backgroundColor: colorList['text-primary'],
    '--hamburger-bg': colorList['text-primary'],
  } as CSSProperties;
  return (
    <div
      onClick={onClick}
      className={cn(
        'grid place-content-center w-10 h-10 p-3 mx-auto hover:cursor-pointer',
        open ? 'hamburger-toggle' : '',
      )}
    >
      <div
        style={style}
        className="w-6 h-0.5 rounded-full transition-all duration-150 before:content-[''] before:absolute before:w-6 before:h-0.5 before:rounded-full before:-translate-y-2 before:transition-all before:duration-150 after:content-[''] after:absolute after:w-6 after:h-0.5 after:rounded-full after:translate-y-2 after:transition-all after:duration-150 navbar-hamburger"
      ></div>
    </div>
  );
};

export default Hamburger;
