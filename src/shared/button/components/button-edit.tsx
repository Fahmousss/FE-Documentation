import { cn } from '@/core/utils/class.utils';
import IconPencil from '@/shared/icon/pencil';
import { ButtonActionProps } from '../utils/model';

const ButtonEdit = ({ className, ...props }: ButtonActionProps) => {
  return (
    <button
      {...props}
      className={cn(
        'p-1.5 border border-yellow-600 bg-yellow-100 text-yellow-600 rounded-md',
        className,
      )}
    >
      <IconPencil mode="warning" width={18} height={18} />
    </button>
  );
};

export default ButtonEdit;
