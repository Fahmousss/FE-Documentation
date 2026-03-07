import { cn } from '@/core/utils/class.utils';
import PaginationSize from './pagination-size';
import PaginationSwitch from './pagination-switch';

const PaginationAction = () => {
  return (
    <div className={cn('flex gap-4 items-center text-sm justify-end')}>
      <PaginationSwitch />
      <PaginationSize />
    </div>
  );
};

export default PaginationAction;
