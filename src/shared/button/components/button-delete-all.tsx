import DeleteIconRed from '@/assets/icons/delete-red.svg';
import { cn } from '@/core/utils/class.utils';
import ButtonEID from '..';
import { ButtonDeleteProps } from '../utils/model';

export const ButtonDeleteAll = ({ className, ...props }: ButtonDeleteProps) => {
  return (
    <ButtonEID
      {...props}
      size={'icon'}
      className={cn('bg-transparent enabled:hover:bg-transparent', className)}
      variant={'transparent'}
    >
      <img src={DeleteIconRed} width={20} height={20} alt="delete" />
    </ButtonEID>
  );
};
