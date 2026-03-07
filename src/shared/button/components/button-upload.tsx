import IconUpload from '@/assets/icons/upload.svg';
import { cn } from '@/core/utils/class.utils';
import ButtonEID from '..';
import { ButtonActionProps } from '../utils/model';

const ButtonUpload = ({ isLoading, className, label, icon, ...props }: ButtonActionProps) => {
  return (
    <ButtonEID
      {...props}
      isLoading={isLoading}
      variant={'primary'}
      className={cn('w-fit flex', className)}
    >
      <img src={icon ? icon : IconUpload} />
      {label ? label : ''}
    </ButtonEID>
  );
};

export default ButtonUpload;
