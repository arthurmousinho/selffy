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
import { ProjectDetails } from "@/pages/projects/project-details";
import { AdminLayout } from "@/layouts/admin-layout";
import { AdminUsers } from "@/pages/admin/admin-users";
import { AdminDashboard } from "@/pages/admin/admin-dashboard";
import { Priorities } from "@/pages/priorities/priorities";
import { AdminProjects } from "@/pages/admin/admin-projects";
import { AdminTasks } from "@/pages/admin/admin-tasks";
import { AdminRoles } from "@/pages/admin/admin-roles";

export const ROUTER = createBrowserRouter([
    {
        path: '',
        element: <BaseLayout />,
        children: [
            { path: '', element: <Navigate to={'/dashboard'} /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'projects', element: <Projects /> },
            { path: 'priorities', element: <Priorities /> },
            { path: 'projects/:id', element: <ProjectDetails /> },
            { path: 'notifications', element: <Notifications /> },
            { path: 'settings', element: <Settings /> },
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { path: '', element: <Navigate to={'dashboard'} /> },
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'users', element: <AdminUsers /> },
            { path: 'projects', element: <AdminProjects /> },
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