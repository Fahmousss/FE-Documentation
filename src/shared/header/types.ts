import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { IconProps } from '../icon/types';

export interface HeaderProps {
  title: string;
  className?: string;
}

export interface TabHeaderProps extends HeaderProps {
  active?: boolean;
  onClick?: () => void;
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

export interface LabelProps extends HeaderProps {
  subTitle?: string;
}

export interface EditableLabelProps extends Omit<LabelProps, 'title'> {
  titleKey: string;
}
