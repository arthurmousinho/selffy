import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface GetAdminDashboardResponse {
    users: {
        total: number;
        monthlyGrowth: number;
    },
    projects: {
        total: number;
        inProgress: number;
        finished: number;
        totalRevenue: number;
        monthlyGrowth: number;
    },
    tasks: {
        total: number;
        highPriority: number;
        mediumPriority: number;
        lowPriority: number;
        pending: number;
        completed: number;
        monthlyGrowth: number;
    },
    costs: {
        total: number;
        totalValue: number;
    },
    roles: {
        total: number;
        admin: number;
        default: number;
    }
}

export function getAdminDashboard() {
    const query = useQuery({
        queryKey: ['admin-dashboard'],
        queryFn: async () => {
            const response = await axios.get('/admin/dashboard');
            return response.data as GetAdminDashboardResponse;
        }
    })

    return query;
}