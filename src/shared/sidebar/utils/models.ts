import { listVariants } from '@/core/variants/list.variants';
import { ModalActionProps } from '@/shared/modal/types';
import { VariantProps } from 'class-variance-authority';
import { ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes } from 'react';
import { IconProps } from '../../icon/types';

export interface ISidebar extends Partial<ISidebarServer> {
  Image?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

export interface SidebarProps extends VariantProps<typeof listVariants> {
  item: ISidebar;
  isDropdown: boolean;
  isChild: boolean;
  level: number;
  isDescendant: boolean;
  permissions: string[];
}

export interface SidebarListProps
  extends Omit<HTMLAttributes<HTMLAnchorElement>, 'title'>,
    SidebarProps {
  isLogout?: boolean;
}

export interface SidebarChild extends Omit<ISidebar, 'child'> {}

export interface SidebarState {
  show: boolean;
  isOpen: boolean;
  active: string[];
}

export interface SidebarListRootProps {
  item: ISidebar;
  level: number;
  dataSidebar: ISidebarServer;
  permissions: string[];
}

export interface SidebarListHeaderProps extends HTMLAttributes<HTMLAnchorElement> {}

export interface ModalConfigurationProps extends ModalActionProps {
  item?: ISidebar;
}

export interface IBodySection {
  id?: string;
  name: string;
  icon?: string;
}

export interface ISection {
  id?: string;
  name: string;
}

export interface useSidebarChildProps {
  parent_id: string;
  is_parent: boolean;
}

export interface ISidebarServerBody {
  id?: string;
  parent_id?: string;
  section_id: string;
  path?: string;
  name: string;
  image: string;
  type?: string;
}

export interface ISidebarBody extends ISidebarServerBody {
  child: ISidebarServerBody[];
}

export interface IEditSidebarChildBody extends ISidebarBody {
  delete_child: {
    id: string;
  }[];
}

export interface SidebarServer {
  id: string;
  name: string;
  path: string;
  image: string;
  parent_id: string;
  is_parent?: boolean;
  is_have_component?: boolean;
}

export interface ISidebarServer extends SidebarServer {
  user_id: string;
  permissions?: string[];
  section_id: string;
  update_at: string;
  created_at: string;
  child: Partial<SidebarServer>[];
}

export interface useSidebarProps {
  dis?: boolean;
  section_id: string;
  search?: string;
}

export interface SidebarSectionProps {
  section: ISection;
}
