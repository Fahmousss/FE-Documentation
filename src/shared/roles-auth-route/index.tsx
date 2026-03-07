// import { UserRoles, useUserRoles } from '@/Hooks/useUserRoles';
// import { Fragment, ReactNode } from 'react';
// import { Navigate } from 'react-router-dom';

// export default function RolesAuthRoute({
//   children,
//   roles
// }: {
//   children: ReactNode;
//   roles: Array<UserRoles[number]>;
// }) {
//   const userRoles = useUserRoles();

//   const canAccess = userRoles.some((userRole) => roles.includes(userRole));

//   if (canAccess) return <Fragment>{children}</Fragment>;

//   return <Navigate to="/auth/login" />;
// }
