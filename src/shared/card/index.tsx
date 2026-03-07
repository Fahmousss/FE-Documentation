import useColor from '@/core/hooks/use-color';
import { cn } from '@/core/utils/class.utils';
import { forwardRef } from 'react';
import { EnhancedCardProps } from './types';

const CardEID = forwardRef<HTMLDivElement, EnhancedCardProps>(({ children, className }, ref) => {
  const { colorList } = useColor();
  return (
    <div
      ref={ref}
      style={{
        backgroundColor: colorList.card,
        borderWidth: 1,
        borderColor: colorList.border,
      }}
      className={cn('w-full h-full flex flex-col gap-3 overflow-auto p-4 rounded-md', className)}
    >
      {children}
    </div>
  );  
});

export default CardEID;
