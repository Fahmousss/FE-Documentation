import { ROLE } from '@/core/constant/config.constant';
import Cookies from 'js-cookie';
import { ReactNode } from 'react';

export interface RoleBasedComponentProps {
  role: string;
  permissions?: string[];
  children: ReactNode;
}

const RoleBasedComponent = ({ role, children, permissions }: RoleBasedComponentProps) => {
  const userRole = Cookies.get(ROLE);

  if (role === userRole || permissions?.includes('Create')) {
    return <>{children}</>;
  }
  return null;
};

export default RoleBasedComponent;
