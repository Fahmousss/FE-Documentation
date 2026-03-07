import { AccordionEID } from '..';
import { AccordionListProps } from '../utils/model';

const AccordionList = ({ title, content, first, last }: AccordionListProps) => {
  return (
    <AccordionEID first={first} last={last} title={title} content={content}>
      <AccordionEID.Header />
      <AccordionEID.Content />
    </AccordionEID>
  );
};

export default AccordionList;
