import useColor from '@/core/hooks/use-color';
import { IconProps } from '@/shared/icon/types';
import { forwardRef } from 'react';

interface FullSize extends IconProps {}

const FullSize = forwardRef<SVGSVGElement, FullSize>(({ width, height, ...props }, ref) => {
  const { colorList } = useColor();
  return (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 20}
      height={height ?? 20}
      viewBox="0 0 20 20"
      fill="none"
      className="hover:cursor-pointer"
    >
      <path
        d="M7.5013 18.3346H12.5013C16.668 18.3346 18.3346 16.668 18.3346 12.5013V7.5013C18.3346 3.33464 16.668 1.66797 12.5013 1.66797H7.5013C3.33464 1.66797 1.66797 3.33464 1.66797 7.5013V12.5013C1.66797 16.668 3.33464 18.3346 7.5013 18.3346Z"
        stroke={colorList['text-secondary']}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 5L5 15"
        stroke={colorList['text-secondary']}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0013 8.33333V5H11.668"
        stroke={colorList['text-secondary']}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 11.668V15.0013H8.33333"
        stroke={colorList['text-secondary']}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default FullSize;
