import IconPlus from '@/assets/icons/plus.svg';
import { cn } from '@/core/utils/class.utils';
import ButtonEID from '..';
import { ButtonActionProps } from '../utils/model';

const ButtonAdd = ({ variant, className, label, ...props }: ButtonActionProps) => {
  return (
    <ButtonEID
      {...props}
      variant={variant ? variant : 'primary'}
      className={cn('gap-2 flex justify-center items-center py-2 text-md', className)}
    >
      <img src={IconPlus} width={24} height={24} />
      {label ? label : 'Tambahkan Data'}
    </ButtonEID>
  );
};

export default ButtonAdd;
