import useColor from '@/core/hooks/use-color';
import { IconProps } from '@/shared/icon/types';
import { forwardRef } from 'react';

interface Minimize extends IconProps {}

const Minimize = forwardRef<SVGSVGElement, Minimize>(({ width, height, ...props }, ref) => {
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
      className="hover:cursor-pointer"
    >
      <path
        d="M22 2L13.8 10.2"
        stroke={colorList['text-secondary']}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 6.16992V10.9999H17.83"
        stroke={colorList['text-secondary']}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
        stroke={colorList['text-secondary']}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default Minimize;
