import { ReactNode } from 'react';

export interface AccordionListProps {
  first?: boolean;
  last?: boolean;
  title: string;
  content: ReactNode;
  children?: ReactNode;
}

export interface AccordionChildProps {
  className?: string;
}

export interface AccordionData extends Pick<AccordionListProps, 'title' | 'content'> {}

export interface AccordionListsProps {
  data: AccordionData[];
  className?: string;
}
