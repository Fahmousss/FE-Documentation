import { LayoutEID } from '@/core/store/slice/layout.slice';
import AccordionComponent from '@/shared/accordion/components/accordion-lists';
import { useMemo } from 'react';

interface WidgetListProps {
  items: LayoutEID[];
  widgetHandler: (key: string) => void;
}

const WidgetList = ({ items, widgetHandler }: WidgetListProps) => {
  const item = useMemo(() => {
    return [
      {
        content: (
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <p
                className="flex items-center pl-4 w-full h-10 border hover:cursor-pointer border-grey-300 rounded-md"
                key={item.i}
                onClick={() => widgetHandler(item.i)}
              >
                {item.title}
              </p>
            ))}
          </div>
        ),
        title: 'Widget List',
      },
    ];
  }, [items]);
  return (
    <AccordionComponent
      className="z-[10000] absolute -top-20 left-1/2 -translate-x-1/2 w-[200px]"
      data={item}
    />
  );
};

export default WidgetList;
