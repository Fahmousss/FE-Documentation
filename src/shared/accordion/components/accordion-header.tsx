import { cn } from '@/core/utils/class.utils';
import {
  useAccordionHandleContext,
  useAccordionValueContext,
} from '../hooks/use-accordion-context';
import { AccordionChildProps } from '../utils/model';

const AccordionHeader = ({ className }: AccordionChildProps) => {
  const { setOpen } = useAccordionHandleContext();
  const { open, last, first, title } = useAccordionValueContext();
  return (
    <h2 className="mb-0" id="headingOne">
      <button
        onClick={() => setOpen((open) => !open)}
        className={cn(
          'group relative flex w-full items-center border-b-0 border-b-neutral-600 bg-neutral-500 px-5 py-2.5 text-left text-grey-500 text-base font-bold',
          last ? (open ? '' : 'rounded-b-lg') : '',
          first && 'rounded-t-lg',
          open ? 'border-b' : '',
          className,
        )}
        type="button"
      >
        {title}
        <span
          className={cn(
            '-me-1 ms-auto h-5 w-5 shrink-0 transition-transform duration-300 ease-in-out',
            open ? 'rotate-[-180deg]' : '',
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
    </h2>
  );
};

export default AccordionHeader;
