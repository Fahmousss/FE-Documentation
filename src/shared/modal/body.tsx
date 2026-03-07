import { cn } from '@/core/utils/class.utils';
import { ModalBodyProps } from './types';

const ModalBody = ({ children, className }: ModalBodyProps) => {
  return <div className={cn('flex flex-col gap-2 py-5', className)}>{children}</div>;
};

export default ModalBody;
