import { Injectable } from "@nestjs/common";
import { FindUserByIdUseCase } from "../find-user-by-id/find-user-by-id.usecase";
import { Project } from "@domain/entities/project/project.entity";
import { Task } from "@domain/entities/task/task.entity";

interface GetUserDashboardUseCaseRequest {
    requestUserId: string;
    ownerId: string;
}

type ProjectRankingResponse = {
    title: string;
    completedTasks: number;
    pendingTasks: number;
}

@Injectable()
export class GetUserDashboardUseCase {

    constructor(
        private findUserByIdUseCase: FindUserByIdUseCase
    ) { }

    public async execute(request: GetUserDashboardUseCaseRequest) {
        const user = await this.findUserByIdUseCase.execute({
            userId: request.ownerId,
            requestUserId: request.requestUserId,
        });
        const userProjects = user.getProjects();

        if (!userProjects || userProjects.length === 0) {
            return {
                completedTasks: 0,
                activeProjects: 0,
                totalRevenue: 0,
                projectRanking: [],
                completedTasksMonthlyGrowth: 0,
                activeProjectsMonthlyGrowth: 0,
            };
        }

        const completedTasks = userProjects
            .flatMap((project) => project.getTasks() || [])
            .filter((task) => typeof task.getStatus === "function" && task.getStatus() === "COMPLETED").length;

        const completedTasksMonthlyGrowth = this.calculateMonthlyGrowth(
            userProjects.flatMap(project => project.getTasks() || []),
            'COMPLETED',
        );

        const activeProjects = userProjects.filter(
            (project) => project.getStatus() === "IN_PROGRESS"
        ).length;

        const activeProjectsMonthlyGrowth = this.calculateMonthlyGrowth(
            userProjects,
            'IN_PROGRESS',
        );

        const totalRevenue = userProjects.reduce(
            (sum, project) => sum + (project.getRevenue() || 0), 0
        );
        const totalCostValue = userProjects.reduce(
            (sum, project) => sum + (project.getCosts()?.reduce((sum, cost) => sum + cost.getValue(), 0) || 0), 0
        );

        const totalProfit = totalRevenue - totalCostValue;
        const projectRanking = this.getProjectRanking(userProjects);
        const weekProductivity = this.getWeekProductivity(userProjects);

        return {
            completedTasks,
            completedTasksMonthlyGrowth,
            activeProjects,
            totalProfit,
            activeProjectsMonthlyGrowth,
            totalRevenue,
            projectRanking,
            weekProductivity
        };
    }

    private calculateMonthlyGrowth(items: Array<Task | Project>, status: string): number {
        const now = new Date();
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        const currentMonthCount = items.filter(item => {
            const date = this.getRelevantDate(item);
            return date && date >= startOfCurrentMonth && item.getStatus() === status;
        }).length;

        const lastMonthCount = items.filter(item => {
            const date = this.getRelevantDate(item);
            return date && date >= startOfLastMonth && date <= endOfLastMonth && item.getStatus() === status;
        }).length;

        return Math.max(currentMonthCount - lastMonthCount, 0);
    }

    private getRelevantDate(item: Task | Project): Date | null {
        if (item instanceof Task) {
            return item.getCompletedAt();
        }
        if (item instanceof Project) {
            return item.getUpdatedAt() || item.getCreatedAt();
        }
        return null;
    }

    private getProjectRanking(projects: Project[]): ProjectRankingResponse[] {
        const totalRanking = projects.map((project) => {
            const tasks = project.getTasks() || [];
    
            const completed = tasks.filter(task => task.getStatus() === "COMPLETED").length;
            const pending = tasks.filter(task => task.getStatus() === "PENDING").length;
    
            return {
                title: project.getTitle(),
                completedTasks: completed,
                pendingTasks: pending,
            };
        });
    
        const validRanking = totalRanking.filter(item => item.completedTasks > 0);
    
        return validRanking
            .sort((a, b) => b.completedTasks - a.completedTasks)
            .slice(0, 3); //  top 3
    }
    
    private getWeekProductivity(projects: Project[]) {
        const allTasks: Task[] = [];
        projects.map(project => allTasks.push(...project.getTasks()));

        const daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        const initialProductivity = daysOfWeek.reduce(
            (acc, day) => ({ ...acc, [day]: 0 }), {}
        );

        return allTasks
            .filter(task => task.getStatus() === 'COMPLETED')
            .reduce((acc, task) => {
                const taskCompletedAt = task.getCompletedAt()

                if (!taskCompletedAt) {
                    return acc;
                }
                const completedDay = daysOfWeek[new Date(taskCompletedAt).getDay()];
                acc[completedDay]++;
                return acc;
            }, initialProductivity);
    }

}