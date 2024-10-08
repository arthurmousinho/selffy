import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface GetAdminDashboardResponse {
    users: {
        total: number;
        free: number;
        premium: number;
    },
    projects: {
        total: number;
        inProgress: number;
        finished: number;
        totalRevenue: number;
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