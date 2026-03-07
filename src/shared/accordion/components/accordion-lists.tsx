import { cn } from '@/core/utils/class.utils';
import { AccordionListsProps } from '../utils/model';
import AccordionItem from './accordion-list';

const AccordionLists = ({ data, className }: AccordionListsProps) => {
  return (
    <div className={cn('flex flex-col', className)}>
      {data.map((item, index) => (
        <AccordionItem
          key={`accordion-item-${index}`}
          content={item.content}
          title={item.title}
          first={index === 0}
          last={index === data.length - 1}
        />
      ))}
    </div>
  );
};

export default AccordionLists;
