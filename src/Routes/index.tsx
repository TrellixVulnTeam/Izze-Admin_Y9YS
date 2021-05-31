import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthLayout from '../pages/Layouts/AuthLayout';
import HomeLayout from '../pages/Layouts/HomeLayout';
import RouteMap, { DashboardRoute } from './RoutesConstants';

const SignIn = React.lazy(() => import('../pages/SignIn/SignIn'));
const DashBoard = React.lazy(() => import('../pages/Ingredients/Ingredients'));

const AppRoutes = () => {
  let element = useRoutes([
    {
      path: RouteMap.main.default,
      element: <AuthLayout />,
      children: [
        {
          path: RouteMap.main.default,
          element: <Navigate to={RouteMap.main.SigninPage} />,
        },
        { path: RouteMap.main.SigninPage, element: <SignIn /> },
      ],
    },
    {
      path: RouteMap.HomeLayout.default,
      element: <Navigate to={DashboardRoute} />,
    },
    {
      path: RouteMap.HomeLayout.default,
      element: <HomeLayout />,
      children: [
        {
          path: RouteMap.HomeLayout.DashboardPage,
          element: <DashBoard />,
        },
        { path: RouteMap.HomeLayout.IngredientsPage, element: <DashBoard /> },
      ],
    },
    { path: '*', element: <div>Page not found</div> },
  ]);
  return element;
};

export default AppRoutes;
