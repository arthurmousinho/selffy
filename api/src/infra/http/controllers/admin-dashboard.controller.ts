import { CountProjectByStatusUseCase } from "@application/use-cases/project/count-projects-by-status/count-projects-by-status.usecase";
import { CountProjectsUseCase } from "@application/use-cases/project/count-projects/count-projects.usecase";
import { GetTotalRevenueUseCase } from "@application/use-cases/project/get-total-revenue/get-total-revenue.usecase";
import { CountUsersByPlanUseCase } from "@application/use-cases/user/count-users-by-plan/count-users-by-plan.usecase";
import { CountUsersUseCase } from "@application/use-cases/user/count-users/count-users.usecase";
import { Controller, Get } from "@nestjs/common";
import { AdminDashboardViewModel } from "../view-models/admin-dashboard.viewmodel";

@Controller("/admin/dashboard")
export class AdminDashboardController {

    constructor(
        private countUsersUseCase: CountUsersUseCase,
        private countUsersByPlanUseCase: CountUsersByPlanUseCase,

        private countProjectsUseCase: CountProjectsUseCase,
        private countProjectsByPlanUseCase: CountProjectByStatusUseCase,
        private getTotalRevenueUseCase: GetTotalRevenueUseCase,
    ) {}

    @Get()
    public async getDashboard() {
        const [
            usersCount,
            freeUsersCount,
            premiumUsersCount,

            projectsCount,
            inProgressProjectsCount,
            finishedProjectsCount,
            totalRevenue,
        ] = await Promise.all([
            this.countUsersUseCase.execute(),
            this.countUsersByPlanUseCase.execute('FREE'),
            this.countUsersByPlanUseCase.execute('PREMIUM'),

            this.countProjectsUseCase.execute(),
            this.countProjectsByPlanUseCase.execute('IN_PROGRESS'),
            this.countProjectsByPlanUseCase.execute('FINISHED'),
            this.getTotalRevenueUseCase.execute(),
        ])

        return AdminDashboardViewModel.toHTTP({
            totalUsers: usersCount,
            freeUsers: freeUsersCount,
            premiumUsers: premiumUsersCount,
            totalProjects: projectsCount,
            inProgressProjects: inProgressProjectsCount,
            finishedProjects: finishedProjectsCount,
            totalRevenue
        })
    }

}