// components/AlertEID.tsx
import { cn } from '@/core/utils/class.utils';
import ButtonEID from '@/shared/button';
import { ButtonMode } from '@/shared/button/utils/model';
import Typography from '@/shared/typography';
import { AlertCircle, Info, ShieldAlert, ShieldCheck, ShieldX, X } from 'lucide-react';
import { forwardRef } from 'react';
import type { AlertProps as AlertPropsType } from './types';
import { AlertTextVariants, AlertVariants } from './variants';

interface AlertProps extends Omit<AlertPropsType, 'onClose'> {
  className?: string;
  title: string;
  message?: string;
  mode?: 'default' | 'success' | 'warning' | 'error' | 'danger';
  onClose?: () => void;
  action?: () => void;
}

const AlertEID = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, title, message, mode = 'default', action, onClose, ...props }, ref) => {
    const getIcon = () => {
      const iconProps = {
        size: 34,
        className: 'flex-shrink-0',
      };

      switch (mode) {
        case 'success':
          return (
            <ShieldCheck {...iconProps} className={cn(iconProps.className, 'text-green-700')} />
          );
        case 'warning':
          return (
            <ShieldAlert {...iconProps} className={cn(iconProps.className, 'text-yellow-700')} />
          );
        case 'error':
          return <AlertCircle {...iconProps} className={cn(iconProps.className, 'text-red-600')} />;
        case 'danger':
          return <ShieldX {...iconProps} className={cn(iconProps.className, 'text-red-600')} />;
        case 'default':
        default:
          return <Info {...iconProps} className={cn(iconProps.className, 'text-blue-600')} />;
      }
    };

    const getButtonVariant = (): ButtonMode => {
      switch (mode) {
        case 'success':
          return 'success';
        case 'warning':
          return 'warning';
        case 'error':
        case 'danger':
          return 'danger';
        case 'default':
        default:
          return 'secondary';
      }
    };

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          AlertVariants({ mode }),
          className,
          'max-w-lg w-full shadow-md rounded-xl border',
        )}
      >
        <div className="flex justify-between items-center gap-8">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getIcon()}
            <div className="flex-1 min-w-0">
              <Typography.H3
                className={cn(
                  AlertTextVariants({ mode }),
                  '-tracking-1 text-left font-bold leading-5',
                )}
              >
                {title}
              </Typography.H3>
              {message && (
                <Typography.H6
                  className={cn(
                    AlertTextVariants({ mode }),
                    'opacity-90 w-full font-normal -tracking-2 mt-0.5 leading-tight text-left',
                  )}
                >
                  {message}
                </Typography.H6>
              )}
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 rounded-full transition-colors duration-200"
              aria-label="Close notification"
            >
              <X size={24} className={cn(AlertTextVariants({ mode }))} />
            </button>
          )}
        </div>

        {action && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <ButtonEID onClick={action} variant={getButtonVariant()} className="w-full">
              View More
            </ButtonEID>
          </div>
        )}
      </div>
    );
  },
);

AlertEID.displayName = 'AlertEID';

export default AlertEID;
