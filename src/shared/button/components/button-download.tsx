import IconDownload from '@/assets/icons/download.svg';
import { cn } from '@/core/utils/class.utils';
import ButtonEID from '..';
import { ButtonActionProps } from '../utils/model';

const ButtonDownload = ({ isLoading, className, label, icon, ...props }: ButtonActionProps) => {
  return (
    <ButtonEID
      {...props}
      isLoading={isLoading}
      variant={'primary'}
      className={cn('w-fit flex', className)}
    >
      <img src={icon ? icon : IconDownload} />
      {label ? label : ''}
    </ButtonEID>
  );
};

export default ButtonDownload;
