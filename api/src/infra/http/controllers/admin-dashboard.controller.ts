import { CountProjectByStatusUseCase } from "@application/use-cases/project/count-projects-by-status/count-projects-by-status.usecase";
import { CountProjectsUseCase } from "@application/use-cases/project/count-projects/count-projects.usecase";
import { GetTotalRevenueUseCase } from "@application/use-cases/project/get-total-revenue/get-total-revenue.usecase";
import { CountUsersByPlanUseCase } from "@application/use-cases/user/count-users-by-plan/count-users-by-plan.usecase";
import { CountUsersUseCase } from "@application/use-cases/user/count-users/count-users.usecase";
import { Controller, Get } from "@nestjs/common";
import { AdminDashboardViewModel } from "../view-models/admin-dashboard.viewmodel";
import { CountCostsUseCase } from "@application/use-cases/cost/count-costs/count-costs.usecase";
import { GetCostsTotalValueUseCase } from "@application/use-cases/cost/get-costs-total-value/get-costs-total-value.usecase";

@Controller("/admin/dashboard")
export class AdminDashboardController {

    constructor(
        private countUsersUseCase: CountUsersUseCase,
        private countUsersByPlanUseCase: CountUsersByPlanUseCase,

        private countProjectsUseCase: CountProjectsUseCase,
        private countProjectsByPlanUseCase: CountProjectByStatusUseCase,
        private getTotalRevenueUseCase: GetTotalRevenueUseCase,

        private countCostsUseCase: CountCostsUseCase,
        private getCostsTotalValueUseCase: GetCostsTotalValueUseCase
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
            projectsTotalRevenue,

            costsCount,
            costsTotalValue
        ] = await Promise.all([
            this.countUsersUseCase.execute(),
            this.countUsersByPlanUseCase.execute('FREE'),
            this.countUsersByPlanUseCase.execute('PREMIUM'),

            this.countProjectsUseCase.execute(),
            this.countProjectsByPlanUseCase.execute('IN_PROGRESS'),
            this.countProjectsByPlanUseCase.execute('FINISHED'),
            this.getTotalRevenueUseCase.execute(),

            this.countCostsUseCase.execute(),
            this.getCostsTotalValueUseCase.execute()
        ])

        return AdminDashboardViewModel.toHTTP({
            totalUsers: usersCount,
            freeUsers: freeUsersCount,
            premiumUsers: premiumUsersCount,
            totalProjects: projectsCount,
            inProgressProjects: inProgressProjectsCount,
            finishedProjects: finishedProjectsCount,
            totalRevenue: projectsTotalRevenue,
            costsCount,
            costsTotalValue
        })
    }

}