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
        const user = await this.findUserByIdUseCase.execute(request.ownerId);
        const userProjects = user.getProjects();

        if (!userProjects || userProjects.length === 0) {
            return {
                completedTasks: 0,
                activeProjects: 0,
                totalRevenue: 0,
                projectRanking: [],
            };
        }

        const completedTasks = userProjects
            .flatMap((project) => project.getTasks() || [])
            .filter((task) => typeof task.getStatus === "function" && task.getStatus() === "COMPLETED").length;

        const activeProjects = userProjects.filter(
            (project) => project.getStatus() === "IN_PROGRESS"
        ).length;

        const totalRevenue = userProjects.reduce(
            (sum, project) => sum + (project.getRevenue() || 0), 0
        );

        const projectRanking = this.getProjectRanking(userProjects);
        const weekProductivity = this.getWeekProductivity(userProjects);

        return {
            completedTasks,
            activeProjects,
            totalRevenue,
            projectRanking,
            weekProductivity
        };
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
        })

        // Top 3 projects
        const rankingPodium = totalRanking
            .sort((a, b) => b.completedTasks - a.completedTasks)
            .slice(0, 3);

        return rankingPodium;
    }

    private getWeekProductivity(projects: Project[]) {
        const allTasks: Task[] = [];
        projects.map(project => allTasks.push(...project.getTasks()));

        const daysOfWeek = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
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