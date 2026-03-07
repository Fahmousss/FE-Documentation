import { IconProps } from '@/shared/icon/types';
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { TabViewMode } from './variant';

export interface TabViewItems {
  id: string;
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
}

export interface TabViewProps {
  mode?: TabViewMode;
  items: TabViewItems[];
  currentTabs?: (e: string) => void;
  activeTabs?: string;
}

export interface TabViewValueContextProps extends TabViewProps {
  active: string;
  isSubtitle: boolean;
}

export interface TabViewHandlerContextProps {
  setActive: (id: string) => void;
}

export interface TabViewContainerProps {
  children: ReactNode;
}

export interface TabViewHeaderContainerProps {
  children: ReactNode;
}

export interface TabViewContentContainerProps {
  children: ReactNode;
}

export interface TabViewHeaderProps {
  item: Omit<TabViewItems, 'content'>;
}
