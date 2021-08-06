import { makeStyles } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { PartialRouteObject } from 'react-router';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Equipment from '../pages/Equipment/Equipment';
import AuthLayout from '../pages/Layouts/AuthLayout';
import HomeLayout from '../pages/Layouts/HomeLayout';
import RouteMap, { DashboardRoute, EquipmentsRoute, SkinCareIngredientsRoute, NutritionRoute, MealRoute, BlogsRoute, SkinCareRoute, SkinCareRecipeRoute, SkinCarePlanRoute, WorkoutRoute, ExerciseRoute, WorkoutPlanRoute, NutritionIngredientsRoute, AdminUserRoute, AppUsersRoute, MealPlanRoute, MealRecipesRoute, NutritionPlanRoute, AdminViewProfileRoute } from './RoutesConstants';

import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import EcoIcon from '@material-ui/icons/Eco';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import MobxObserver from '../Mobx/Helpers/MobxObserver';
import { useStore } from '../Mobx/Helpers/UseStore';
import { toJS } from 'mobx';
import { useEffect } from 'react';
import { useState } from 'react';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';

const SignIn = React.lazy(() => import('../pages/SignIn/SignIn'));
const SkinCareIngredients = React.lazy(() => import('../pages/SkinCareIngredients/SkinCareIngredients'));
const SkinCareRecipe = React.lazy(() => import('../pages/SkinCareRecipe/SkinCareRecipe'));
const SkinCarePlan = React.lazy(() => import('../pages/SkinCarePlan/SkinCarePlan'));
const WorkoutPlan = React.lazy(() => import('../pages/WorkoutPlan/WorkoutPlan'));
const WorkoutExercise = React.lazy(() => import('../pages/WorkoutExercise/WorkoutExercise'));
const NutritionIngredients = React.lazy(() => import('../pages/NutritionIngredients/NutritionIngredients'));
const NutritionPlan = React.lazy(() => import('../pages/NutritionPlan/NutritionPlan'));
const MealRecipe = React.lazy(() => import('../pages/MealRecipe/MealRecipe'));
const MealPlan = React.lazy(() => import('../pages/MealPlan/MealPlan'));
const Blogs = React.lazy(() => import('../pages/Blogs/Blogs'));
const AppUsers = React.lazy(() => import('../pages/AppUsers/AppUsers'));
const AdminUser = React.lazy(() => import('../pages/AdminUser/AdminUser'))
const AdminProfile = React.lazy(() => import('../pages/AdminProfileDetails/AdminProfileDetails'));

const useStyles = makeStyles((theme: any) => ({
  underDevlopment: {
    width: '100%',
    height: `calc(100vh - 64px)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem'
  },
}));




const AppRoutes = () => {
  const classes = useStyles()
  const { UserStore } = useStore()
  const { setMenuConfig } = UserStore
  const { user_type } = toJS(UserStore.UserDetails)

  const SkinCareMenu = {
    route: [{ path: RouteMap.HomeLayout.SkinCarePage, element: <Navigate to={SkinCareIngredientsRoute} />, },
    {
      path: RouteMap.HomeLayout.SkinCarePage,
      element: <Outlet />,
      children: [
        { path: RouteMap.HomeLayout.SkinCareIngredientsPage, element: <SkinCareIngredients /> },
        { path: RouteMap.HomeLayout.SkinCareRecipePage, element: <SkinCareRecipe /> },
        { path: RouteMap.HomeLayout.SkinCarePlanPage, element: <SkinCarePlan /> },
      ]
    },
    ],
    menu: {
      title: 'Skin Care',
      href: SkinCareRoute,
      icon: DashboardIcon,
      children: [
        {
          title: 'Ingredients',
          href: SkinCareIngredientsRoute,
        },
        {
          title: 'Recipe',
          href: SkinCareRecipeRoute,
        },
        {
          title: 'Plan',
          href: SkinCarePlanRoute,
        },
      ],
    },
  }
  const WorkoutMenu = {
    route: [
      { path: RouteMap.HomeLayout.WorkoutPage, element: <Navigate to={EquipmentsRoute} />, },
      {
        path: RouteMap.HomeLayout.WorkoutPage,
        element: <Outlet />,
        children: [
          { path: RouteMap.HomeLayout.EquipmentsPage, element: <Equipment /> },
          { path: RouteMap.HomeLayout.ExercisePage, element: <WorkoutExercise /> },
          { path: RouteMap.HomeLayout.WorkoutPlanPage, element: <WorkoutPlan /> },
        ]
      },
    ],
    menu: {
      title: 'Movement',
      href: WorkoutRoute,
      icon: FitnessCenterIcon,
      children: [
        {
          title: 'Equipments',
          href: EquipmentsRoute,
        },
        {
          title: 'Exercise',
          href: ExerciseRoute,
        },
        {
          title: 'Plan',
          href: WorkoutPlanRoute,
        },
      ],
    },
  }
  const NutritionMenu = {
    route: [{ path: RouteMap.HomeLayout.NutritionPage, element: <Navigate to={NutritionRoute} />, },
    {
      path: RouteMap.HomeLayout.NutritionPage,
      element: <Outlet />,
      children: [
        { path: RouteMap.HomeLayout.NutritionIngredientPage, element: <NutritionIngredients /> },
        { path: RouteMap.HomeLayout.NutritionPlanPage, element: <NutritionPlan /> },
      ]
    }],
    menu: {
      title: 'Nutrition',
      href: NutritionRoute,
      icon: EcoIcon,
      children: [
        {
          title: 'Ingredients',
          href: NutritionIngredientsRoute,
        },
        {
          title: 'Plan',
          href: NutritionPlanRoute,
        },
      ],
    },
  }
  const MealMenu = {
    route: [{ path: RouteMap.HomeLayout.MealPage, element: <Navigate to={MealRoute} />, },
    {
      path: RouteMap.HomeLayout.MealPage,
      element: <Outlet />,
      children: [
        { path: RouteMap.HomeLayout.MealRecipesPage, element: <MealRecipe /> },
        { path: RouteMap.HomeLayout.MealPlanPage, element: <MealPlan /> },
      ]
    }],
    menu: {
      title: 'Meal Plan',
      href: MealRoute,
      icon: FastfoodIcon,
      children: [
        {
          title: 'Recipe',
          href: MealRecipesRoute,
        },
        {
          title: 'Plan',
          href: MealPlanRoute,
        },
      ],
    },
  }
  const BlogMenu = {
    route: [{ path: RouteMap.HomeLayout.BlogsPage, element: <Blogs /> }],
    menu: {
      title: 'Blogs',
      href: BlogsRoute,
      icon: BubbleChartIcon,
    },
  }
  const AppUserMenu = {
    route: [{ path: RouteMap.HomeLayout.AppUsersPage, element: <AppUsers /> }],
    menu: {
      title: 'App Users',
      href: AppUsersRoute,
      icon: PersonIcon,
    },
  }
  const AdminUserMenu = {
    route: [{ path: RouteMap.HomeLayout.AdminUserPage, element: <AdminUser /> }],
    menu: {
      title: 'Admin Users',
      href: AdminUserRoute,
      icon: PeopleIcon,
    },
  }

  const DashboardMenu = {
    title: 'Dashboard',
    href: DashboardRoute,
    icon: HomeIcon,
  }

  const getUserRoutes = (user_type: string) => {
    switch (user_type) {
      case "SUPERADMIN":
        return [SkinCareMenu, WorkoutMenu, NutritionMenu, MealMenu, BlogMenu, AppUserMenu, AdminUserMenu]
        break;
      case "ADMIN":
        return [SkinCareMenu, WorkoutMenu, NutritionMenu, MealMenu, BlogMenu, AppUserMenu, AdminUserMenu];
        break;
      case "SKINCARE":
        return [SkinCareMenu, BlogMenu];
        break;
      case "WORKOUT":
        return [WorkoutMenu, BlogMenu];
        break;
      case "NUTRITION":
        return [NutritionMenu, MealMenu, BlogMenu];
        break;
      case "CUSTOMERCARE":
        return [AppUserMenu];
        break;
      default:
        return [];
    }
  }

  const UserRoutes: any[] = getUserRoutes(user_type).map(({ route }: any) => route).flat(1)
  const UserMenu: any[] = [
    {
      title: 'Pages',
      pages: [
        DashboardMenu,
        ...getUserRoutes(user_type).map(({ menu }: any) => menu)
      ],
    },
  ]
  setMenuConfig(UserMenu)


  let element = [
    {
      path: RouteMap.main.default,
      element: <AuthLayout />,
      children: [
        { path: RouteMap.main.default, element: <Navigate to={RouteMap.main.SigninPage} />, },
        { path: RouteMap.main.SigninPage, element: <SignIn /> },
        { path: RouteMap.main.ForgotPasswordPage, element: <ForgotPassword /> },
      ],
    },
    { path: RouteMap.HomeLayout.default, element: <Navigate to={DashboardRoute} />, },
    {
      path: RouteMap.HomeLayout.default,
      element: <HomeLayout />,
      children: [
        { path: RouteMap.HomeLayout.DashboardPage, element: <div className={classes.underDevlopment}> Welcome Back</div> },
        { path: RouteMap.HomeLayout.AdminProfileViewPage, element: <AdminProfile /> },
        ...UserRoutes,

        //========== Dummy routes ==========
        { path: RouteMap.HomeLayout.SkinCarePage, element: <Navigate to={SkinCareIngredientsRoute} />, },
        {
          path: RouteMap.HomeLayout.SkinCarePage,
          element: <Outlet />,
          children: [
            { path: RouteMap.HomeLayout.SkinCareIngredientsPage, element: <div className={classes.underDevlopment}>Unauthrized</div> },
            { path: RouteMap.HomeLayout.SkinCareRecipePage, element: <div className={classes.underDevlopment}>Unauthrized</div> },
            { path: RouteMap.HomeLayout.SkinCarePlanPage, element: <div className={classes.underDevlopment}>Unauthrized</div> },
          ]
        },


        { path: RouteMap.HomeLayout.WorkoutPage, element: <Navigate to={EquipmentsRoute} /> },
        {
          path: RouteMap.HomeLayout.WorkoutPage,
          element: <Outlet />,
          children: [
            { path: RouteMap.HomeLayout.EquipmentsPage, element: <div className={classes.underDevlopment}>Unauthrized</div> },
            { path: RouteMap.HomeLayout.ExercisePage, element: <div className={classes.underDevlopment}>Unauthrized</div> },
            { path: RouteMap.HomeLayout.WorkoutPlanPage, element: <div className={classes.underDevlopment}>Unauthrized</div> },
          ]
        },

        { path: RouteMap.HomeLayout.NutritionPage, element: <Navigate to={NutritionRoute} /> },
        {
          path: RouteMap.HomeLayout.NutritionPage,
          element: <Outlet />,
          children: [
            { path: RouteMap.HomeLayout.NutritionIngredientPage, element: <div className={classes.underDevlopment}>Unauthrized</div> },
            { path: RouteMap.HomeLayout.NutritionPlanPage, element: <div className={classes.underDevlopment}>Unauthrized</div> },
          ]
        },

        { path: RouteMap.HomeLayout.MealPage, element: <Navigate to={MealRoute} /> },
        {
          path: RouteMap.HomeLayout.MealPage,
          element: <Outlet />,
          children: [
            { path: RouteMap.HomeLayout.MealRecipesPage, element: <div className={classes.underDevlopment}>Unauthrized</div> },
            { path: RouteMap.HomeLayout.MealPlanPage, element: <div className={classes.underDevlopment}>Unauthrized</div> },
          ]
        },

        { path: RouteMap.HomeLayout.BlogsPage, element: <div className={classes.underDevlopment}>Unauthrized</div> },

        { path: RouteMap.HomeLayout.AppUsersPage, element: <div className={classes.underDevlopment}>Unauthrized</div> },

        { path: RouteMap.HomeLayout.AdminUserPage, element: <div className={classes.underDevlopment}>Unauthrized</div> },
      ],
    },
    { path: '*', element: <div className={classes.underDevlopment}>Page not found</div> },
  ];


  return useRoutes(element);
};

export default MobxObserver(AppRoutes);
