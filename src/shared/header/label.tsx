import useColor from '@/core/hooks/use-color';
import { cn } from '@/core/utils/class.utils';
import Typography from '../typography';
import { LabelProps } from './types';

const Label = ({ subTitle, title, className }: LabelProps) => {
  const { colorList } = useColor();
  return (
    <div className={cn('w-full flex flex-col', className)}>
      <Typography.Display3
        style={{
          color: colorList['text-primary'],
        }}
      >
        {title}
      </Typography.Display3>
      <Typography.H5
        style={{
          color: colorList['text-secondary'],
        }}
        className="font-light"
      >
        {subTitle}
      </Typography.H5>
    </div>
  );
};

export default Label;
