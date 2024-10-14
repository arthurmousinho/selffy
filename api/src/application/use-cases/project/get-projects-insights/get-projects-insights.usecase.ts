import { Injectable } from "@nestjs/common";
import { CountProjectsUseCase } from "../count-projects/count-projects.usecase";
import { CountProjectByStatusUseCase } from "../count-projects-by-status/count-projects-by-status.usecase";
import { GetTotalRevenueUseCase } from "../get-total-revenue/get-total-revenue.usecase";

export interface ProjectsInsights {
    total: number;
    inProgress: number;
    finished: number;
    totalRevenue: number;
}

@Injectable()
export class GetProjectsInsightsUseCase {

    constructor(
        private countProjectsUseCase: CountProjectsUseCase,
        private countProjectsByPlanUseCase: CountProjectByStatusUseCase,
        private getTotalRevenueUseCase: GetTotalRevenueUseCase,
    ) { }

    public async execute(): Promise<ProjectsInsights> {
        const [
            projectsCount,
            inProgressProjectsCount,
            finishedProjectsCount,
            projectsTotalRevenue,
        ] = await Promise.all([
            this.countProjectsUseCase.execute(),
            this.countProjectsByPlanUseCase.execute('IN_PROGRESS'),
            this.countProjectsByPlanUseCase.execute('FINISHED'),
            this.getTotalRevenueUseCase.execute(),
        ])

        return {
            total: projectsCount,
            inProgress: inProgressProjectsCount,
            finished: finishedProjectsCount,
            totalRevenue: projectsTotalRevenue,
        }
    }

}