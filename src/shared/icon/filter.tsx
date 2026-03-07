import useColor from '@/core/hooks/use-color';
import { IconProps } from '@/shared/icon/types';
import { forwardRef } from 'react';

interface IconFilter extends IconProps {}

const IconFilter = forwardRef<SVGSVGElement, IconFilter>(
  ({ mode, width, height, ...props }, ref) => {
    const { colorList } = useColor();
    return (
      <svg
        ref={ref}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 20}
        height={height ?? 21}
        viewBox="0 0 20 21"
        fill="none"
        className="hover:cursor-pointer"
      >
        <path
          d="M4.49992 1.94653H15.4999C16.4166 1.94653 17.1666 2.69653 17.1666 3.6132V5.44653C17.1666 6.1132 16.7499 6.94653 16.3333 7.3632L12.7499 10.5299C12.2499 10.9465 11.9166 11.7799 11.9166 12.4465V16.0299C11.9166 16.5299 11.5833 17.1965 11.1666 17.4465L9.99992 18.1965C8.91659 18.8632 7.41658 18.1132 7.41658 16.7799V12.3632C7.41658 11.7799 7.08325 11.0299 6.74992 10.6132L3.58325 7.27987C3.16659 6.8632 2.83325 6.1132 2.83325 5.6132V3.69653C2.83325 2.69653 3.58325 1.94653 4.49992 1.94653Z"
          stroke={colorList['text-secondary']}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.10833 1.94653L5 8.52987"
          stroke={colorList['text-secondary']}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

export default IconFilter;
