import { cn } from '@/core/utils/class.utils';
import ButtonEID from '../button';
import { FormFooterProps } from './types';

const FormFooter = ({
  submitText = 'Tambah Data',
  cancelText = 'Batal',
  isLoading,
  onCancel,
  onOk,
  className,
}: FormFooterProps) => {
  return (
    <div
      className={cn(
        'w-full pt-5 flex justify-end items-center gap-2 border-t border-t-grey-400',
        className,
      )}
    >
      <ButtonEID isLoading={isLoading} variant={'secondary'} type="button" onClick={onCancel}>
        {cancelText}
      </ButtonEID>
      <ButtonEID
        isLoading={isLoading}
        type={onOk ? 'button' : 'submit'}
        variant={'primary'}
        onClick={onOk}
      >
        {submitText}
      </ButtonEID>
    </div>
  );
};

export default FormFooter;
