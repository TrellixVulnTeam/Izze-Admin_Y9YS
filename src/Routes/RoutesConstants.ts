const main = '/';
export const MainLayoutRoute = main;
export const SigninRoute = `${main}login`;
export const SignupRoute = `${main}signup`;

const HomeLayout = `/home`;

export const HomeDefaultLayout = HomeLayout;
export const DashboardRoute = `${HomeLayout}/dashboard`;


export const SkinCareRoute = `${HomeLayout}/skincare`;
export const SkinCareIngredientsRoute = `${SkinCareRoute}/skincare-ingredients`;
export const SkinCareRecipeRoute = `${SkinCareRoute}/skincare-recipe`
export const SkinCarePlanRoute = `${SkinCareRoute}/skincare-plan`

export const WorkoutRoute = `${HomeLayout}/workout`;
export const EquipmentsRoute = `${WorkoutRoute}/equipments`;
export const ExerciseRoute = `${WorkoutRoute}/exercises`
export const WorkoutPlanRoute = `${WorkoutRoute}/workout-plan`


const RouteMap = {
  main: {
    default: main,
    SigninPage: SigninRoute.replace(main, ''),
    signupPage: SignupRoute.replace(main, ''),
  },
  HomeLayout: {
    default: HomeDefaultLayout,
    DashboardPage: DashboardRoute.replace(HomeLayout, ''),

    SkinCarePage: SkinCareRoute.replace(HomeLayout, ''),
    SkinCareIngredientsPage: SkinCareIngredientsRoute.replace(SkinCareRoute, ''),
    SkinCareRecipePage: SkinCareRecipeRoute.replace(SkinCareRoute, ''),
    SkinCarePlanPage: SkinCarePlanRoute.replace(SkinCareRoute, ''),
    
    WorkoutPage: WorkoutRoute.replace(HomeLayout, ''),
    EquipmentsPage: EquipmentsRoute.replace(WorkoutRoute, ''),
    ExercisePage: ExerciseRoute.replace(WorkoutRoute, ''),
    WorkoutPlanPage: WorkoutPlanRoute.replace(WorkoutRoute, ''),


  }
};

export default RouteMap;
