import useColor from '@/core/hooks/use-color';
import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { forwardRef } from 'react';
import { IconVariant } from './variants';

interface CloseNavbar extends IconProps {}

const CloseNavbar = forwardRef<SVGSVGElement, CloseNavbar>(
  ({ mode, width, height, ...props }, ref) => {
    const { colorList } = useColor();
    return (
      <svg
        ref={ref}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? 24}
        viewBox="0 0 24 24"
        fill="none"
        className="noDrag group hover:cursor-pointer"
      >
        <path
          d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
          stroke="#FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M10.5901 7.67993H14.8301V11.9299"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M14.83 7.67993L9.17004 13.3399"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M6 16.51C9.89 17.81 14.11 17.81 18 16.51"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
      </svg>
    );
  },
);

export default CloseNavbar;
