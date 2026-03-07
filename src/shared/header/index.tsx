import { cn } from '@/core/utils/class.utils';
import { HeaderProps } from './types';

const Header = ({ title, className }: HeaderProps) => {
  return (
    <h1 className={cn('text-3xl font-bold text-gray-800', className)}>
      {title}
    </h1>
  );
};

export default Header;
