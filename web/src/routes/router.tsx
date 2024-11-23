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
import { ProjectDashboard } from "@/pages/projects/project-dashboard";
import { AdminCosts } from "@/pages/admin/admin-costs";
import { AuthzGuard } from "./guards/authz-guard";
import { AdminSettings } from "@/pages/admin/admin-settings";
import { Home } from "@/pages/home/home";
import { ProjectTasks } from "@/pages/projects/project-tasks";
import { ProjectCosts } from "@/pages/projects/project-costs";
import { ProjectForm } from "@/pages/projects/project-form";

export const ROUTER = createBrowserRouter([
    {
        path: '',
        element: <Home />
    },
    {
        path: '/app',
        element:
            <AuthzGuard roles={['FREE', 'PREMIUM', 'ADMIN']}>
                <BaseLayout />
            </AuthzGuard>,
        children: [
            { path: '', element: <Navigate to={'dashboard'} /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'projects', element: <Projects /> },
            { path: 'priorities', element: <Priorities /> },
            { path: 'projects/new', element: <ProjectForm /> },
            { path: 'projects/:id', element: <ProjectDashboard /> },
            { path: 'projects/:id/edit', element: <ProjectForm /> },
            { path: 'projects/:id/tasks', element: <ProjectTasks /> },
            { path: 'projects/:id/costs', element: <ProjectCosts /> },
            { path: 'notifications', element: <Notifications /> },
            { path: 'settings', element: <Settings /> },
        ]
    },
    {
        path: '/admin',
        element:
            <AuthzGuard roles={['ADMIN']}>
                <AdminLayout />
            </AuthzGuard>,
        children: [
            { path: '', element: <Navigate to={'dashboard'} /> },
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'users', element: <AdminUsers /> },
            { path: 'projects', element: <AdminProjects /> },
            { path: 'projects/new', element: <ProjectForm /> },
            { path: 'projects/:id/edit', element: <ProjectForm /> },
            { path: 'costs', element: <AdminCosts /> },
            { path: 'tasks', element: <AdminTasks /> },
            { path: 'settings', element: <AdminSettings /> },
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