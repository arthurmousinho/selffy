import { CompletedTasksCard } from "@/components/dashboard/completed-tasks-card";
import { ActiveProjectsCard } from "@/components/dashboard/active-projects-card";
import { TotalRevenueCard } from "@/components/dashboard/total-revenue-card";
import { ProjectRankingCard } from "@/components/dashboard/project-ranking-card";
import { WeekProductivityCard } from "@/components/dashboard/week-productivity-card";
import { getUserDashboard } from "@/hooks/use-user";

export function Dashboard() {

    const { data: dashboard } = getUserDashboard();

    return (
        <main className="space-y-6">
            <section className="grid grid-cols-3 gap-4">
                <CompletedTasksCard
                    count={dashboard?.completedTasks || 0}
                    growth={dashboard?.completedTasksMonthlyGrowth || 0}
                />
                <ActiveProjectsCard
                    count={dashboard?.activeProjects || 0}
                    growth={dashboard?.activeProjectsMonthlyGrowth || 0}
                />
                <TotalRevenueCard
                    total={dashboard?.totalRevenue || 0}
                    profit={dashboard?.totalProfit || 0}
                />
            </section>
            <section className="grid grid-cols-2 gap-4">
                <ProjectRankingCard ranking={dashboard?.projectRanking || []} />
                <WeekProductivityCard data={dashboard?.weekProductivity || {} as any} />
            </section>
        </main>
    )
}