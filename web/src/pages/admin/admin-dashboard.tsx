import { getAdminDashboard } from "@/hooks/use-dashboard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Home } from "lucide-react";
import { AdminDashboardProjectsCard } from "@/components/admin/dashboard/admin-dashboard-projects-card";
import { AdminDashboardUsersCard } from "@/components/admin/dashboard/admin-dashboard-users-card";
import { AdminDashboardTotalProjectRevenueCard } from "@/components/admin/dashboard/admin-dashboard-total-project-revenue-card";


export function AdminDashboard() {

    const { data } = getAdminDashboard();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 border-b">
                <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                    <span className="text-sm">
                        <Home size={20} />
                    </span>
                </div>
                <h2 className="font-semibold text-xl ">
                    Dashboard
                </h2>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="grid grid-cols-3 gap-4">
                    <AdminDashboardUsersCard
                        total={data?.users.total || 0}
                        free={data?.users.free || 0}
                        premium={data?.users.premium || 0}
                    />
                    <AdminDashboardProjectsCard
                        total={data?.projects.total || 0}
                        inProgress={data?.projects.inProgress || 0}
                        finished={data?.projects.finished || 0}
                    />
                    <section className="grid grid-cols-1 gap-4">
                        <AdminDashboardTotalProjectRevenueCard
                            totalRevenue={data?.projects.totalRevenue || 0}
                        />
                        <AdminDashboardTotalProjectRevenueCard
                            totalRevenue={data?.projects.totalRevenue || 0}
                        />
                    </section>
                </div>
            </CardContent>
        </Card>
    );
}
