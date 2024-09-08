import { Layout } from "@/layouts/layout";
import { Dashboard } from "@/pages/dashboard";
import { createBrowserRouter } from "react-router-dom";

export const ROUTER = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Dashboard />
            }
        ]
    }
])