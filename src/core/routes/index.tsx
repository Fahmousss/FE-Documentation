import AddDataDocumentation from '@/pages/AddDataDocumentation/main';
import Documentations from '@/pages/documentation/main';
import Layout from '@/pages/layout/main';
import Products from '@/pages/product/main';
import AuthRedirect from '@/shared/authentication/auth-redirect';
import { Login } from '@/shared/login';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
 
const SubPage = lazy(() => import('@/pages/example/main')); 
const User = lazy(() => import('@/pages/user/main'));
const Role = lazy(() => import('@/pages/role/main'));
const Notification = lazy(() => import('@/pages/notification/main'));
const ManagementUser = lazy(() => import('@/pages/user-management/main'));
const CreateManagementUser = lazy(() => import('@/pages/user-management/create'));
const EditManagementUser = lazy(() => import('@/pages/user-management/edit'));
const Admin = lazy(() => import('@/pages/example/admin'));
const DynamicForm = lazy(() => import('@/pages/example/dynamic-form/form-page'));
const DynamicFormModal = lazy(() => import('@/pages/example/dynamic-form/modal-page'));

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // Application
      {
        index: true,
        element: <AuthRedirect />,
      },
      {
        path: '/documentation',
        element: <Documentations />,
      },
      {
        path: '/documentation/AddDataDocumentation',
        element: <AddDataDocumentation />,
      },
      {
        path: '/product',
        element: <Products />,
      },
      // {
      //   path: '/maintenance-schedule',
      //   element: <SampleDashboard />,
      // },
      // {
      //   path: '/maintenance-preventive',
      //   element: <SampleDashboard />,
      // },
      // {
      //   path: '/alarm',
      //   element: <SampleDashboard />,
      // },

      // // Management
      // {
      //   path: '/user-management',
      //   element: <User />,
      // },
      // {
      //   path: '/role',
      //   element: <Role />,
      // },
      // {
      //   path: '/setting',
      //   element: <SampleDashboard />,
      // },

      // // Database
      // {
      //   path: '/master-data/dynamic-data',
      //   element: <SampleDashboard />,
      // },
      // {
      //   path: '/master-data/line',
      //   element: <SampleDashboard />,
      // },
      // {
      //   path: '/master-data/machine',
      //   element: <SampleDashboard />,
      // },
      // {
      //   path: '/master-data/parameter',
      //   element: <SampleDashboard />,
      // },
      // {
      //   path: '/master-data/man-power/default',
      //   element: <SampleDashboard />,
      // },
      // {
      //   path: '/master-data/man-power/override',
      //   element: <SampleDashboard />,
      // },
    ],
  },
  {
    path: '/login',
    element: <Login.V1 />,
  },
]);

export default Router;
