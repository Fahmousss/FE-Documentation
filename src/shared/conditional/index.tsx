import { ReactNode } from 'react';

interface ConditionalProps {
  condition: boolean;
  children: ReactNode;
}

const Conditional = ({ condition, children }: ConditionalProps) => {
  return condition ? <>{children}</> : null;
};

export default Conditional;
