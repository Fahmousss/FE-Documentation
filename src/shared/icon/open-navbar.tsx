import { cn } from '@/core/utils/class.utils';
import { IconProps } from '@/shared/icon/types';
import { forwardRef } from 'react';
import { IconVariant } from './variants';

interface OpenNavbar extends IconProps {}

const OpenNavbar = forwardRef<SVGSVGElement, OpenNavbar>(
  ({ mode, width, height, ...props }, ref) => {
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
          d="M10.5901 13.3398H14.8301V9.09985"
          stroke="#FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M14.83 13.3399L9.17004 7.67993"
          stroke="#FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
        <path
          d="M6 16.51C9.89 17.81 14.11 17.81 18 16.51"
          stroke="#FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(IconVariant({ strokeMode: mode }))}
        />
      </svg>
    );
  },
);

export default OpenNavbar;
