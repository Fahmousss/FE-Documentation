import { cn } from '@/core/utils/class.utils';
import IconTrash from '@/shared/icon/trash';
import { ButtonDeleteProps } from '../utils/model';

const ButtonDelete = ({ className, ...props }: ButtonDeleteProps) => {
  return (
    <button
      {...props}
      className={cn(
        className,
        'p-1.5 bg-red-100 border border-red-600 rounded-md',
      )}
    >
      <IconTrash mode={'red'} width={18} height={18} />
    </button>
  );
};

export default ButtonDelete;
