import useColor from '@/core/hooks/use-color';
import { cn } from '@/core/utils/class.utils';
import { FormLabelProps } from './types';

const FormLabel = ({ label, className }: FormLabelProps) => {
  const { colorList } = useColor();
  return (
    <p
      style={{
        color: colorList.form.fontTitle,
      }}
      className={cn('text-left text-sm font-bold whitespace-pre-line', className)}
    >
      {label}
    </p>
  );
};

export default FormLabel;
