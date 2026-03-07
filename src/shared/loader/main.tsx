import { cn } from '@/core/utils/class.utils';
import { cva } from 'class-variance-authority';

const LoaderVariants = cva('', {
  variants: {
    size: {
      button: 'w-4 h-4 border-r-white border-l-white border-b-white',
      small: 'w-6 h-6',
      middle: 'w-8 h-8',
      large: 'w-12 h-12',
    },
    color: {
      green: 'border-r-green-500 border-l-green-500 border-b-green-500',
      white: 'border-r-white border-l-white border-b-white',
      black: 'border-r-black border-l-black border-b-black',
      blue: 'border-r-blue-500 border-l-blue-500 border-b-blue-500',
    },
  },
});

const LoaderEID = ({
  size = 'middle',
  color = 'green',
  className,
  style = 'default',
}: {
  size?: 'button' | 'small' | 'middle' | 'large';
  color?: 'white' | 'black' | 'blue' | 'green';
  className?: string;
  style?: 'default' | 'loader';
}) => {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <div className="relative flex justify-center items-center">
        <div
          className={cn(
            LoaderVariants({ size, color }),
            'absolute border-4 border-t-4 rounded-full animate-spin',
          )}
        ></div>
      </div>
    </div>
  );
};

export default LoaderEID;
