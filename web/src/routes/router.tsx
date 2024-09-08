import { AuthLayout } from "@/layouts/authLayout";
import { BaseLayout } from "@/layouts/baseLayout";
import { Dashboard } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth/signin";
import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "@/pages/auth/signup";

export const ROUTER = createBrowserRouter([
    {
        path: '',
        element: <BaseLayout />,
        children: [
            { path: '', element: <Dashboard /> }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: 'signin', element: <SignIn /> },
            { path: 'signup', element: <SignUp /> }
        ]
    }
])