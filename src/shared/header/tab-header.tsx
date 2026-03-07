import { cn } from '@/core/utils/class.utils';
import { TabHeaderProps } from './types';

const TabHeader = ({ active, title, Icon, className, onClick }: TabHeaderProps) => {
  return (
    <div onClick={onClick} className={cn('pt-0 pb-1 px-4 flex gap-2 items-center', className)}>
      {Icon ? <Icon mode={active ? 'success' : 'grey'} width={16} height={16} /> : null}
      <p className={cn('text-md font-bold', active ? 'text-green-500' : 'text-grey-200')}>
        {title}
      </p>
    </div>
  );
};

export default TabHeader;
