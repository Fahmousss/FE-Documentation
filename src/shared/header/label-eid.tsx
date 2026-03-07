import { cn } from '@/core/utils/class.utils';
import { LabelProps } from './types';

const LabelEID = ({ subTitle, title, className }: LabelProps) => {
  return (
    <div className={cn('w-full flex flex-col', className)}>
      <h5 className="text-grey-500 text-lg font-bold">{title}</h5>
      <p className="text-grey-300 text-base">{subTitle}</p>
    </div>
  );
};

export default LabelEID;
