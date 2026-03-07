import { cn } from '@/core/utils/class.utils';
import { useState } from 'react';
import { AccordionHandleContext, AccordionValueContext } from '../hooks/use-accordion-context';
import { AccordionListProps } from '../utils/model';

const AccordionRoot = ({ first, last, children, title, content }: AccordionListProps) => {
  const [open, setOpen] = useState(false);
  return (
    <AccordionValueContext.Provider value={{ open, first, last, title, content }}>
      <AccordionHandleContext.Provider value={{ setOpen }}>
        <div
          className={cn(
            'border border-b-0 border-neutral-600 bg-neutral-100',
            first && 'rounded-t-lg',
            last && 'rounded-b-lg border-b',
          )}
        >
          {children}
        </div>
      </AccordionHandleContext.Provider>
    </AccordionValueContext.Provider>
  );
};

export default AccordionRoot;
