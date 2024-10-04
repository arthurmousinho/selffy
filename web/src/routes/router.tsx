import { AuthLayout } from "@/layouts/auth-layout";
import { BaseLayout } from "@/layouts/base-layout";
import { Dashboard } from "@/pages/dashboard/dashboard";
import { SignIn } from "@/pages/auth/signin";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { SignUp } from "@/pages/auth/signup";
import { NotFound } from "@/pages/errors/notFound";
import { Forbidden } from "@/pages/errors/forbidden";
import { Projects } from "@/pages/projects/projects";
import { Notifications } from "@/pages/notifications/notifications";
import { Settings } from "@/pages/settings/settings";
import { AdminLayout } from "@/layouts/admin-layout";
import { AdminUsers } from "@/pages/admin/admin-users";
import { AdminDashboard } from "@/pages/admin/admin-dashboard";
import { Priorities } from "@/pages/priorities/priorities";
import { AdminProjects } from "@/pages/admin/admin-projects";
import { AdminTasks } from "@/pages/admin/admin-tasks";
import { AdminRoles } from "@/pages/admin/admin-roles";
import { ProjectDashboard } from "@/pages/projects/project-dashboard";
import { AdminCosts } from "@/pages/admin/admin-costs";
import { AuthzGuard } from "./guards/authz-guard";
import { AuthGuard } from "./guards/auth-guard";

export const ROUTER = createBrowserRouter([
    {
        path: '',
        element: <AuthGuard><BaseLayout/></AuthGuard>,
        children: [
            { path: '', element: <Navigate to={'/dashboard'} /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'projects', element: <Projects /> },
            { path: 'priorities', element: <Priorities /> },
            { path: 'projects/:id', element: <ProjectDashboard /> },
            { path: 'notifications', element: <Notifications /> },
            { path: 'settings', element: <Settings /> },
        ]
    },
    {
        path: '/admin',
        element: <AuthzGuard userType="ADMIN"><AdminLayout /></AuthzGuard>,
        children: [
            { path: '', element: <Navigate to={'dashboard'} /> },
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'users', element: <AdminUsers /> },
            { path: 'projects', element: <AdminProjects /> },
            { path: 'costs', element: <AdminCosts /> },
            { path: 'tasks', element: <AdminTasks /> },
            { path: 'roles', element: <AdminRoles /> },
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