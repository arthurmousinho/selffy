import { CompletedTasksCard } from "@/components/dashboard/completed-tasks-card";
import { ActiveProjectsCard } from "@/components/dashboard/active-projects-card";
import { TotalRevenueCard } from "@/components/dashboard/total-revenue-card";
import { ProjectRankingCard } from "@/components/dashboard/project-ranking-card";
import { WeekProductivityCard } from "@/components/dashboard/week-productivity-card";
import { InProgressProjectCard } from "@/components/dashboard/in-progress-project-card";

export function Dashboard() {
    return (
        <main className="space-y-6">
            <section className="grid grid-cols-3 gap-4">
                <CompletedTasksCard />
                <ActiveProjectsCard />
                <TotalRevenueCard />
            </section>
            <section className="grid grid-cols-2 gap-4">
                <ProjectRankingCard />
                <WeekProductivityCard />
            </section>
            <section>
                <div className="grid grid-cols-2 gap-4">
                    <InProgressProjectCard 
                        title="MyChaty"
                        icon="💬"
                        color="#86efac"
                    />
                    <InProgressProjectCard 
                        title="Better"
                        icon="🕹️"
                        color="#fca5a5"
                    />
                    <InProgressProjectCard 
                        title="Maple"
                        icon="✅"
                        color="#fdba74"
                    />
                    <InProgressProjectCard 
                        title="ExamChecker"
                        icon="💊"
                        color="#f9a8d4"
                    />
                </div>
            </section>
        </main>
    )
}