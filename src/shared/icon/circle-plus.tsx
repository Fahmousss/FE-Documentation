import useColor from '@/core/hooks/use-color';
import { IconProps } from '@/shared/icon/types';
import { forwardRef } from 'react';

interface CirclePlus extends IconProps {}

const CirclePlus = forwardRef<SVGSVGElement, CirclePlus>(
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
          d="M10.0013 18.3307C14.5846 18.3307 18.3346 14.5807 18.3346 9.9974C18.3346 5.41406 14.5846 1.66406 10.0013 1.66406C5.41797 1.66406 1.66797 5.41406 1.66797 9.9974C1.66797 14.5807 5.41797 18.3307 10.0013 18.3307Z"
          stroke={colorList['text-secondary']}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66797 10H13.3346"
          stroke={colorList['text-secondary']}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 13.3307V6.66406"
          stroke={colorList['text-secondary']}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

export default CirclePlus;
