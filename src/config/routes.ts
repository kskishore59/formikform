import IRoute from "../interfaces/route";
//import LogoutPage from "../pages/auth/logout";
import RegisterPage from "../pages/auth/Register";
import HomePage from "../pages/StepOne";
//import StepTwoPage from '../pages/StepTwo';
//import StepThree from '../pages/StepThree';
//import ResultPage from "../pages/result";
import ForgotPasswordPage from "../pages/auth/forgot";
import SignIn from "../pages/auth/Login";



const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        element: HomePage,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/register',
        exact: true,
        element: RegisterPage,
        name: 'Register Page',
        protected: false
    },
    {
        path: '/login',
        exact: true,
        element: SignIn,
        name: 'Login Page',
        protected: false
    },
    
    {
        path: '/forgot',
        exact: true,
        element: ForgotPasswordPage,
        name: 'Forgot Password Page',
        protected: false
    },
    /*
    {
        path: '/logout',
        exact: true,
        element: LogoutPage,
        name: 'Logout Page',
        protected: true
    },{
        
        path: '/step2',
        exact: true,
        element: StepTwoPage,
        name: 'Step Two Page',
        protected: true
    },
    {
        path: '/step3',
        exact: true,
        element: StepThree,
        name: 'Step Three Page',
        protected: true
    },
    {
        path: '/result',
        exact: true,
        element: ResultPage,
        name: 'Result Page',
        protected: true
    }*/
];

export default routes;
