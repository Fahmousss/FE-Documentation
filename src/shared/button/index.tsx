import { cn } from '@/core/utils/class.utils';
import LoaderEID from '@/shared/loader/main';
import { forwardRef } from 'react';
import { ButtonProps } from './utils/model';
import { ButtonVariants } from './utils/variants';

const ButtonEID = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        disabled={disabled || isLoading}
        className={cn(
          ButtonVariants({ size, variant }),
          className,
          'flex items-center justify-center relative disabled:cursor-not-allowed',
        )}
      >
        {isLoading && (
          <div className="mr-3">
            <LoaderEID style='loader' size="button" color="blue" />
          </div>
        )}
        {props.children}
      </button>
    );
  },
);

export default ButtonEID;
