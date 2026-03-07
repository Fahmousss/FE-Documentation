import { cn } from '@/core/utils/class.utils';
import IconEye from '@/shared/icon/eye';
import { ButtonActionProps } from '../utils/model';

const ButtonView = ({ className, ...props }: ButtonActionProps) => {

  return (
    <button
      {...props}
      className={cn(
        className,
        'p-1.5 bg-blue-100 border border-blue-600 rounded-md',
      )}
    >
      <IconEye width={18} height={18} mode={'info'} />
    </button>
  );
};

export default ButtonView;
