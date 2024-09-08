import { AuthLayout } from "@/layouts/authLayout";
import { BaseLayout } from "@/layouts/baseLayout";
import { Dashboard } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth/signin";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { SignUp } from "@/pages/auth/signup";
import { NotFound } from "@/pages/errors/notFound";
import { Forbidden } from "@/pages/errors/forbidden";

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
    },
    {
        path: '/notfound', 
        element: <NotFound />
    },
    {
        path: '/forbidden', 
        element: <Forbidden />
    },
    {
        path: '*', 
        element: <Navigate to={'/notfound'} />
    }
])