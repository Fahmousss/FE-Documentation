import { FC } from 'react';
import AccordionContent from './components/accordion-content';
import AccordionHeader from './components/accordion-header';
import AccordionRoot from './components/accordion-root';
import { AccordionChildProps, AccordionListProps } from './utils/model';

interface AccordionCompound extends FC<AccordionListProps> {
  Header: FC<AccordionChildProps>;
  Content: FC<AccordionChildProps>;
}

(AccordionRoot as AccordionCompound).Header = AccordionHeader;
(AccordionRoot as AccordionCompound).Content = AccordionContent;

export const AccordionEID = AccordionRoot as AccordionCompound;
