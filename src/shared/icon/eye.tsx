import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { IconProps } from './types';
import { IconVariant } from './variants';

interface IconEye extends IconProps {}

const IconEye = forwardRef<SVGSVGElement, IconEye>(({ mode, width, height, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 22}
      height={height ?? 23}
      viewBox="0 0 22 23"
      fill="none"
    >
      <path
        d="M19.1784 8.98023C17.1361 5.77089 14.1478 3.9231 11.0003 3.9231C9.4266 3.9231 7.89708 4.38284 6.50018 5.24043C5.10328 6.10686 3.84784 7.37114 2.82227 8.98023C1.93815 10.3683 1.93815 12.6228 2.82227 14.0108C4.86457 17.229 7.85288 19.068 11.0003 19.068C12.574 19.068 14.1036 18.6082 15.5005 17.7506C16.8974 16.8842 18.1528 15.6199 19.1784 14.0108C20.0625 12.6316 20.0625 10.3683 19.1784 8.98023ZM11.0003 15.0718C9.01991 15.0718 7.4285 13.4715 7.4285 11.5C7.4285 9.52838 9.01991 7.92813 11.0003 7.92813C12.9807 7.92813 14.5721 9.52838 14.5721 11.5C14.5721 13.4715 12.9807 15.0718 11.0003 15.0718Z"
        strokeWidth={2}
        className={cn(IconVariant({ strokeMode: mode }))}
      />
      <path
        d="M11.0002 8.97144C9.61214 8.97144 8.48047 10.1031 8.48047 11.5C8.48047 12.8881 9.61214 14.0197 11.0002 14.0197C12.3883 14.0197 13.5288 12.8881 13.5288 11.5C13.5288 10.1119 12.3883 8.97144 11.0002 8.97144Z"
        className={cn(IconVariant({ strokeMode: mode }))}
      />
    </svg>
  );
});

export default IconEye;
