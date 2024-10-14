import { getAdminDashboard } from "@/hooks/use-dashboard";
import { AdminUsersCard } from "@/components/admin/dashboard/admin-users-card";
import { AdminProjectsCard } from "@/components/admin/dashboard/admin-projects-card";
import { AdminProjectsRevenueCard } from "@/components/admin/dashboard/admin-projects-revenue-card";
import { AdminTasksCard } from "@/components/admin/dashboard/admin-tasks-card";
import { AdminCostsCard } from "@/components/admin/dashboard/admin-costs.card";
import { AdminCostsValueCard } from "@/components/admin/dashboard/admin-costs-value-card";

export function AdminDashboard() {

  const { data } = getAdminDashboard();

  return (
    <main>
      <section className="grid grid-cols-3 gap-4">
        <AdminUsersCard
          total={data?.users.total || 0}
        />
        <AdminProjectsCard
          total={data?.projects.total || 0}
        />
        <AdminProjectsRevenueCard
          revenue={data?.projects.totalRevenue || 0}
        />
        <AdminTasksCard
          total={data?.tasks.total || 0}
        />
        <AdminCostsCard 
          total={data?.costs.total || 0}
        />
        <AdminCostsValueCard 
          total={data?.costs.totalValue || 0}
        />
      </section>
    </main>
  );
}
