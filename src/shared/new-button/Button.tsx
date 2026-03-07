import { cn } from '@/core/utils/class.utils';
import { Loader2, LucideIcon, Plus } from 'lucide-react';
import React, { forwardRef } from 'react';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'green'
  | 'blue'
  | 'purple'
  | 'violet'
  | 'orange'
  | 'red'
  | 'yellow'
  | 'pink'
  | 'indigo'
  | 'teal'
  | 'cyan';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'custom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  height?: string; // Custom height class seperti "h-[34px]"
  showDefaultIcon?: boolean;
  defaultLabel?: string;
  label?: string;
  isLoading?: boolean;
  loadingText?: string;
  // Icon props
  icon?: LucideIcon; // Custom icon component
  iconSize?: number; // Size icon (default 19)
  iconStrokeWidth?: number; // Stroke width icon (default 2.5)
  showIconOnLoading?: boolean; // Show icon saat loading (default false)
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'sm',
      height,
      className,
      children,
      disabled,
      showDefaultIcon = true,
      defaultLabel = 'New Data',
      label,
      isLoading = false,
      loadingText,
      icon,
      iconSize = 18.5,
      iconStrokeWidth = 2,
      showIconOnLoading = false,
      ...props
    },
    ref,
  ) => {
    // Base classes tanpa padding vertical
    const baseClasses =
      'inline-flex items-center gap-1.5 justify-center rounded-lg font-medium font-Inter text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px] leading-normal transition-all duration-200 ease-in-out focus:outline-none px-4 whitespace-nowrap relative overflow-hidden';

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'h-[36px]',
      md: 'h-9',
      lg: 'h-11',
      custom: '',
    };

    // Jika ada custom height, gunakan size custom
    const finalSize = height ? 'custom' : size;
    const heightClass = height || sizeClasses[finalSize];

    const variantClasses: Record<ButtonVariant, string> = {
      default:
        'bg-gradient-to-b from-slate-50 to-slate-100 text-slate-700 border-[1.5px] border-slate-300/60 shadow-[inset_0_0.4px_1px_1px_rgba(255,255,255,0.6)] hover:to-gray-100',
      primary:
        'bg-gradient-to-b from-blue-500 to-blue-600 text-white border-[1.5px] border-blue-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-blue-500/90 hover:to-blue-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
      green:
        'bg-gradient-to-b from-green-500 to-green-600 text-white border-[1.5px] border-green-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-green-500/90 hover:to-green-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
      blue: 'bg-gradient-to-b from-blue-500 to-blue-600 text-white border-[1.5px] border-blue-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-blue-500/90 hover:to-blue-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
      purple:
        'bg-gradient-to-b from-purple-500 to-purple-600 text-white border-[1.5px] border-purple-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-purple-500/90 hover:to-purple-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
      violet:
        'bg-gradient-to-b from-violet-500 to-violet-600 text-white border-[1.5px] border-violet-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-violet-500/90 hover:to-violet-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
      orange:
        'bg-gradient-to-b from-orange-500 to-orange-600 text-white border-[1.5px] border-orange-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-orange-500/90 hover:to-orange-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
      red: 'bg-gradient-to-b from-red-500 to-red-600 text-white border-[1.5px] border-red-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-red-500/90 hover:to-red-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
      yellow:
        'bg-gradient-to-b from-yellow-500 to-yellow-600 text-white border-[1.5px] border-yellow-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-yellow-500/90 hover:to-yellow-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
      pink: 'bg-gradient-to-b from-pink-500 to-pink-600 text-white border-[1.5px] border-pink-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-pink-500/90 hover:to-pink-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
      indigo:
        'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border-[1.5px] border-indigo-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-indigo-500/90 hover:to-indigo-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
      teal: 'bg-gradient-to-b from-teal-500 to-teal-600 text-white border-[1.5px] border-teal-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-teal-500/90 hover:to-teal-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
      cyan: 'bg-gradient-to-b from-cyan-500 to-cyan-600 text-white border-[1.5px] border-cyan-600 shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.3)] hover:from-cyan-500/90 hover:to-cyan-500 hover:shadow-[inset_0_1.2px_1px_0px_rgba(255,255,255,0.4)]',
    };

    const focusClasses: Record<ButtonVariant, string> = {
      default: 'focus:ring-2 focus:ring-gray-400 focus:ring-offset-1',
      primary: 'focus:ring-2 focus:ring-blue-400 focus:ring-offset-1',
      green: 'focus:ring-2 focus:ring-green-400 focus:ring-offset-1',
      blue: 'focus:ring-2 focus:ring-blue-400 focus:ring-offset-1',
      purple: 'focus:ring-2 focus:ring-purple-400 focus:ring-offset-1',
      violet: 'focus:ring-2 focus:ring-violet-400 focus:ring-offset-1',
      orange: 'focus:ring-2 focus:ring-orange-400 focus:ring-offset-1',
      red: 'focus:ring-2 focus:ring-red-400 focus:ring-offset-1',
      yellow: 'focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1',
      pink: 'focus:ring-2 focus:ring-pink-400 focus:ring-offset-1',
      indigo: 'focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1',
      teal: 'focus:ring-2 focus:ring-teal-400 focus:ring-offset-1',
      cyan: 'focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1',
    };

    const disabledClasses: Record<ButtonVariant, string> = {
      default:
        'disabled:bg-gradient-to-b disabled:from-gray-50 disabled:to-gray-100 disabled:text-gray-400 disabled:border-[1.5px] disabled:border-gray-200 disabled:shadow-none disabled:cursor-not-allowed',
      primary:
        'disabled:bg-gradient-to-b disabled:from-blue-300 disabled:to-blue-300 disabled:text-blue-100 disabled:border-[1.5px] disabled:border-blue-300 disabled:shadow-none disabled:cursor-not-allowed',
      green:
        'disabled:bg-gradient-to-b disabled:from-green-300 disabled:to-green-300 disabled:text-green-100 disabled:border-[1.5px] disabled:border-green-300 disabled:shadow-none disabled:cursor-not-allowed',
      blue: 'disabled:bg-gradient-to-b disabled:from-blue-300 disabled:to-blue-300 disabled:text-blue-100 disabled:border-[1.5px] disabled:border-blue-300 disabled:shadow-none disabled:cursor-not-allowed',
      purple:
        'disabled:bg-gradient-to-b disabled:from-purple-300 disabled:to-purple-300 disabled:text-purple-100 disabled:border-[1.5px] disabled:border-purple-300 disabled:shadow-none disabled:cursor-not-allowed',
      violet:
        'disabled:bg-gradient-to-b disabled:from-violet-300 disabled:to-violet-300 disabled:text-violet-100 disabled:border-[1.5px] disabled:border-violet-300 disabled:shadow-none disabled:cursor-not-allowed',
      orange:
        'disabled:bg-gradient-to-b disabled:from-orange-300 disabled:to-orange-300 disabled:text-orange-100 disabled:border-[1.5px] disabled:border-orange-300 disabled:shadow-none disabled:cursor-not-allowed',
      red: 'disabled:bg-gradient-to-b disabled:from-red-300 disabled:to-red-300 disabled:text-red-100 disabled:border-[1.5px] disabled:border-red-300 disabled:shadow-none disabled:cursor-not-allowed',
      yellow:
        'disabled:bg-gradient-to-b disabled:from-yellow-300 disabled:to-yellow-300 disabled:text-yellow-100 disabled:border-[1.5px] disabled:border-yellow-300 disabled:shadow-none disabled:cursor-not-allowed',
      pink: 'disabled:bg-gradient-to-b disabled:from-pink-300 disabled:to-pink-300 disabled:text-pink-100 disabled:border-[1.5px] disabled:border-pink-300 disabled:shadow-none disabled:cursor-not-allowed',
      indigo:
        'disabled:bg-gradient-to-b disabled:from-indigo-300 disabled:to-indigo-300 disabled:text-indigo-100 disabled:border-[1.5px] disabled:border-indigo-300 disabled:shadow-none disabled:cursor-not-allowed',
      teal: 'disabled:bg-gradient-to-b disabled:from-teal-300 disabled:to-teal-300 disabled:text-teal-100 disabled:border-[1.5px] disabled:border-teal-300 disabled:shadow-none disabled:cursor-not-allowed',
      cyan: 'disabled:bg-gradient-to-b disabled:from-cyan-300 disabled:to-cyan-300 disabled:text-cyan-100 disabled:border-[1.5px] disabled:border-cyan-300 disabled:shadow-none disabled:cursor-not-allowed',
    };

    // Determine icon to render
    const renderIcon = () => {
      if (!showDefaultIcon) return null;

      const IconComponent = icon || Plus;
      return <IconComponent size={iconSize} strokeWidth={iconStrokeWidth} />;
    };

    // Loading content
    const loadingContent = (
      <>
        <Loader2 size={iconSize} className="animate-spin" strokeWidth={iconStrokeWidth} />
        {showIconOnLoading &&
          icon &&
          !children &&
          (() => {
            const IconComponent = icon;
            return (
              <IconComponent size={iconSize} strokeWidth={iconStrokeWidth} className="opacity-30" />
            );
          })()}
        {loadingText || 'Loading...'}
      </>
    );

    // Default content when no children are provided
    const defaultContent = (
      <>
        {renderIcon()}
        {label || defaultLabel}
      </>
    );

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          heightClass,
          variantClasses[variant],
          focusClasses[variant],
          disabledClasses[variant],
          'relative disabled:cursor-not-allowed',
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? loadingContent : children || defaultContent}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
