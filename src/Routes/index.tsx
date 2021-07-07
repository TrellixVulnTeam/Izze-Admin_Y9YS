import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Equipment from '../pages/Equipment/Equipment';
import AuthLayout from '../pages/Layouts/AuthLayout';
import HomeLayout from '../pages/Layouts/HomeLayout';
import RouteMap, { DashboardRoute, EquipmentsRoute, SkinCareIngredientsRoute, NutritionRoute, MealRoute, BlogsRoute } from './RoutesConstants';

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
  let element = useRoutes([
    {
      path: RouteMap.main.default,
      element: <AuthLayout />,
      children: [
        { path: RouteMap.main.default, element: <Navigate to={RouteMap.main.SigninPage} />, },
        { path: RouteMap.main.SigninPage, element: <SignIn /> },
      ],
    },
    { path: RouteMap.HomeLayout.default, element: <Navigate to={DashboardRoute} />, },
    {
      path: RouteMap.HomeLayout.default,
      element: <HomeLayout />,
      children: [
        { path: RouteMap.HomeLayout.DashboardPage, element: <div className={classes.underDevlopment}> Under Development</div> },

        { path: RouteMap.HomeLayout.SkinCarePage, element: <Navigate to={SkinCareIngredientsRoute} />, },
        {
          path: RouteMap.HomeLayout.SkinCarePage,
          element: <Outlet />,
          children: [
            { path: RouteMap.HomeLayout.SkinCareIngredientsPage, element: <SkinCareIngredients /> },
            { path: RouteMap.HomeLayout.SkinCareRecipePage, element: <SkinCareRecipe /> },
            { path: RouteMap.HomeLayout.SkinCarePlanPage, element: <SkinCarePlan /> },
          ]
        },

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

        { path: RouteMap.HomeLayout.NutritionPage, element: <Navigate to={NutritionRoute} />, },
        {
          path: RouteMap.HomeLayout.NutritionPage,
          element: <Outlet />,
          children: [
            { path: RouteMap.HomeLayout.NutritionIngredientPage, element: <NutritionIngredients /> },
            { path: RouteMap.HomeLayout.NutritionPlanPage, element: <NutritionPlan /> },
          ]
        },

        { path: RouteMap.HomeLayout.MealPage, element: <Navigate to={MealRoute} />, },
        {
          path: RouteMap.HomeLayout.MealPage,
          element: <Outlet />,
          children: [
            { path: RouteMap.HomeLayout.MealRecipesPage, element: <MealRecipe /> },
            { path: RouteMap.HomeLayout.MealPlanPage, element: <MealPlan /> },
          ]
        },

        { path: RouteMap.HomeLayout.BlogsPage, element: <Blogs /> },

        { path: RouteMap.HomeLayout.AppUsersPage, element: <AppUsers /> },

        // { path: RouteMap.HomeLayout.EquipmentPage, element: <Equipment /> },
      ],
    },
    { path: '*', element: <div className={classes.underDevlopment}>Page not found</div> },
  ]);

  return element;
};

export default AppRoutes;
