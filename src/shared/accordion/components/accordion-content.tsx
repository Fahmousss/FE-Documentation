import { cn } from '@/core/utils/class.utils';
import { useAccordionValueContext } from '../hooks/use-accordion-context';
import { AccordionChildProps } from '../utils/model';

const AccordionContent = ({ className }: AccordionChildProps) => {
  const { open, content } = useAccordionValueContext();
  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out overflow-hidden',
        open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
        className,
      )}
    >
      <div className="px-5 py-3 text-grey-300 text-sm">{content}</div>
    </div>
  );
};

export default AccordionContent;
