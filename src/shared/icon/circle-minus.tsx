import useColor from '@/core/hooks/use-color';
import { IconProps } from '@/shared/icon/types';
import { forwardRef } from 'react';

interface CircleMinus extends IconProps {}

const CircleMinus = forwardRef<SVGSVGElement, CircleMinus>(
  ({ mode, width, height, ...props }, ref) => {
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
        className="noDrag group hover:cursor-pointer"
      >
        <path
          d="M9.9349 18.3307C14.5182 18.3307 18.2682 14.5807 18.2682 9.9974C18.2682 5.41406 14.5182 1.66406 9.9349 1.66406C5.35156 1.66406 1.60156 5.41406 1.60156 9.9974C1.60156 14.5807 5.35156 18.3307 9.9349 18.3307Z"
          stroke={colorList['text-secondary']}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.60156 10H13.2682"
          stroke={colorList['text-secondary']}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

export default CircleMinus;
