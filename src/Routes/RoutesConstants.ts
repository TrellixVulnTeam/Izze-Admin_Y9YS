const main = '/';
export const MainLayoutRoute = main;
export const SigninRoute = `${main}login`;
export const SignupRoute = `${main}signup`;

const HomeLayout = `/home`;

export const HomeDefaultLayout = HomeLayout;
export const DashboardRoute = `${HomeLayout}/dashboard`;
export const IngredientsRoute = `${HomeLayout}/ingredients`;


const RouteMap = {
  main: {
    default: main,
    SigninPage: SigninRoute.replace(main, ''),
    signupPage: SignupRoute.replace(main, ''),
  },
  HomeLayout: {
    default: HomeDefaultLayout,
    DashboardPage: DashboardRoute.replace(HomeLayout, ''),
    IngredientsPage: IngredientsRoute.replace(HomeLayout, ''),
  }
};

export default RouteMap;
