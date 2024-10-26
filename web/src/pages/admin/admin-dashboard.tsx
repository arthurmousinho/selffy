import { getAdminDashboard } from "@/hooks/use-dashboard";
import { AdminUsersCard } from "@/components/admin/dashboard/user/admin-users-card";
import { AdminProjectsCard } from "@/components/admin/dashboard/project/admin-projects-card";
import { AdminProjectsRevenueCard } from "@/components/admin/dashboard/project/admin-projects-revenue-card";
import { AdminTasksCard } from "@/components/admin/dashboard/task/admin-tasks-card";
import { AdminCostsCard } from "@/components/admin/dashboard/cost/admin-costs.card";
import { AdminCostsValueCard } from "@/components/admin/dashboard/cost/admin-costs-value-card";
import { AdminUsersTypeCard } from "@/components/admin/dashboard/user/admin-users-type-card";
import { AdminRolesUserTypesCard } from "@/components/admin/dashboard/role/admin-roles-user-types-card";
import { AdminUsersPlanCard } from "@/components/admin/dashboard/user/admin-users-plan-card";
import { AdminProjectsStatusCard } from "@/components/admin/dashboard/project/admin-projects-status-card";
import { AdminTasksPrioritiesCard } from "@/components/admin/dashboard/task/admin-tasks-priorities-card";
import { AdminTasksStatusCard } from "@/components/admin/dashboard/task/admin-tasks-status-card";

export function AdminDashboard() {

  const { data } = getAdminDashboard();

  return (
    <main className="space-y-4">
      <section className="grid grid-cols-3 gap-4">
        <AdminUsersCard
          total={data?.users.total || 0}
          monthlyGrowth={data?.users.monthlyGrowth || 0}
        />
        <AdminProjectsCard
          total={data?.projects.total || 0}
          monthlyGrowth={data?.projects.monthlyGrowth || 0}
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
      <section className="grid grid-cols-3 gap-4">
        <AdminUsersPlanCard
          premium={data?.users.premium || 0}
          free={data?.users.free || 0}
        />
        <div className="space-y-4 col-span-2">
          <AdminUsersTypeCard
            total={data?.users.total || 0}
            admin={data?.users.admin || 0}
            default={data?.users.default || 0}
          />
          <AdminRolesUserTypesCard
            total={data?.roles.total || 0}
            admin={data?.roles.admin || 0}
            default={data?.roles.default || 0}
          />
        </div>
      </section>
      <section className="grid grid-cols-3 gap-4">
        <AdminProjectsStatusCard
          inProgress={data?.projects.inProgress || 0}
          finished={data?.projects.finished || 0}
        />
        <div className="space-y-4 col-span-2">
          <AdminTasksPrioritiesCard
            total={data?.tasks.total || 0}
            high={data?.tasks.highPriority || 0}
            medium={data?.tasks.mediumPriority || 0}
            low={data?.tasks.lowPriority || 0}
          />
          <AdminTasksStatusCard
            total={data?.tasks.total || 0}
            pending={data?.tasks.pending || 0}
            completed={data?.tasks.completed || 0}
          />
        </div>
      </section>
    </main>
  );
}
