import { AuthLayout } from "@/layouts/authLayout";
import { BaseLayout } from "@/layouts/baseLayout";
import { Dashboard } from "@/pages/dashboard/dashboard";
import { SignIn } from "@/pages/auth/signin";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { SignUp } from "@/pages/auth/signup";
import { NotFound } from "@/pages/errors/notFound";
import { Forbidden } from "@/pages/errors/forbidden";
import { Projects } from "@/pages/projects/projects";
import { Notifications } from "@/pages/notifications/notifications";
import { Settings } from "@/pages/settings/settings";
import { ProjectDetails } from "@/pages/projects/project-details";
import { AdminLayout } from "@/layouts/adminLayout";
import { AdminUsers } from "@/pages/admin/admin-users";
import { AdminDashboard } from "@/pages/admin/admin-dashboard";
import { Targets } from "@/pages/target/targets";

export const ROUTER = createBrowserRouter([
    {
        path: '',
        element: <BaseLayout />,
        children: [
            { path: '', element: <Navigate to={'/dashboard'} /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'projects', element: <Projects /> },
            { path: 'targets', element: <Targets /> },
            { path: 'projects/:id', element: <ProjectDetails /> },
            { path: 'notifications', element: <Notifications /> },
            { path: 'settings', element: <Settings /> },
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'users', element: <AdminUsers /> },
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