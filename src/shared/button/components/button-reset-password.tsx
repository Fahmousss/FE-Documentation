import ResetPasswordIcon from '@/assets/icons/reset-password.svg';
import { cn } from '@/core/utils/class.utils';
import ButtonEID from '..';
import { ButtonAddActionProps } from '../utils/model';

export const ButtonResetPassword = ({
  className,
  label,
  isIcon,
  ...props
}: ButtonAddActionProps) => {
  return (
    <ButtonEID
      {...props}
      variant={'password'}
      className={cn(
        'min-w-fit flex gap-2 rounded-[4px] justify-center items-center px-4',
        className,
      )}
    >
      <img src={ResetPasswordIcon} className="size-4" />
      {isIcon ? '' : label ? label : 'Tambahkan Data'}
    </ButtonEID>
  );
};
