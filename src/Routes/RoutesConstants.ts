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

export const NutritionRoute = `${HomeLayout}/nutrition`;
export const NutritionIngredientsRoute = `${NutritionRoute}/ingredients`;
export const NutritionPlanRoute = `${NutritionRoute}/plan`;

export const MealRoute = `${HomeLayout}/meal`;
export const MealRecipesRoute = `${MealRoute}/meal-recipes`;
export const MealPlanRoute = `${MealRoute}/meal-plan`;

export const BlogsRoute = `${HomeLayout}/blogs`;

export const AppUsersRoute = `${HomeLayout}/app-users`;

export const AdminUserRoute = `${HomeLayout}/admin-users`;

export const AdminViewProfileRoute = `${HomeLayout}/admin-profile`;


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

    NutritionPage: NutritionRoute.replace(HomeLayout, ''),
    NutritionIngredientPage: NutritionIngredientsRoute.replace(NutritionRoute, ''),
    NutritionPlanPage: NutritionPlanRoute.replace(NutritionRoute, ''),

    MealPage: MealRoute.replace(HomeLayout, ''),
    MealRecipesPage: MealRecipesRoute.replace(MealRoute, ''),
    MealPlanPage: MealPlanRoute.replace(MealRoute, ''),

    BlogsPage: BlogsRoute.replace(HomeLayout, ''),

    AppUsersPage: AppUsersRoute.replace(HomeLayout, ''),

    AdminUserPage : AdminUserRoute.replace(HomeLayout, ''),

    AdminProfileViewPage : AdminViewProfileRoute.replace(HomeLayout, '')


  }
};

export default RouteMap;
