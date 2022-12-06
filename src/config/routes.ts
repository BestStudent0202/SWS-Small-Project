import IRoute from "../interfaces/route";
import RegisterPage from "../pages/auth/register";
import HomePage from "../pages/home";
import LoginPage from "../pages/auth/login";
import ChangePasswordPage from "../pages/auth/change";
import Admin from "../pages/Admin";

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: HomePage,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/register',
        exact: true,
        component: RegisterPage,
        name: 'Regsiter Page',
        protected: false
    }
    ,
    {
        path: '/login',
        exact: true,
        component: LoginPage,
        name: 'Login Page',
        protected: false
    },
    {
        path: '/change',
        exact: true,
        component: ChangePasswordPage,
        name: 'Chnage Page',
        protected: true
    },
    {
        path: '/admin',
        exact: true,
        component: Admin,
        name: 'Admin ',
        protected: false
    }
];

export default routes;
