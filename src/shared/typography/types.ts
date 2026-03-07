import { HTMLAttributes } from 'react';

export interface TypographyProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}
