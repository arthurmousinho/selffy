import { CountProjectsUseCase } from "@application/use-cases/project/count-projects/count-projects.usecase";
import { GetTotalRevenueUseCase } from "@application/use-cases/project/get-total-revenue/get-total-revenue.usecase";
import { CountUsersUseCase } from "@application/use-cases/user/count-users/count-users.usecase";
import { Controller, Get } from "@nestjs/common";

@Controller("/admin/dashboard")
export class AdminDashboardController {

    constructor(
        private countUsersUseCase: CountUsersUseCase,
        private countProjectsUseCase: CountProjectsUseCase,
        private getTotalRevenueUseCase: GetTotalRevenueUseCase
    ){}

    @Get()
    public async getDashboard() {
        const [ 
            usersCount, 
            projectsCount, 
            totalRevenue 
        ] = await Promise.all([
            this.countUsersUseCase.execute(),
            this.countProjectsUseCase.execute(),
            this.getTotalRevenueUseCase.execute()
        ])
        return { usersCount, projectsCount, totalRevenue }
    }

}