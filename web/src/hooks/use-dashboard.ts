import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface GetAdminDashboardResponse {
    totalRevenue: number;
    projectsCount: number;
    rolesCount: number;
    usersCount: number;
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