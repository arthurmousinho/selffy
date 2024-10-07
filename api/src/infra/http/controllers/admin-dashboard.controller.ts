import { CountProjectsUseCase } from "@application/use-cases/project/count-projects/count-projects.usecase";
import { GetTotalRevenueUseCase } from "@application/use-cases/project/get-total-revenue/get-total-revenue.usecase";
import { CountRolesUseCase } from "@application/use-cases/role/count-roles/count-roles.usecase";
import { CountUsersUseCase } from "@application/use-cases/user/count-users/count-users.usecase";
import { Controller, Get } from "@nestjs/common";

@Controller("/admin/dashboard")
export class AdminDashboardController {

    constructor(
        private countUsersUseCase: CountUsersUseCase,
        private countProjectsUseCase: CountProjectsUseCase,
        private getTotalRevenueUseCase: GetTotalRevenueUseCase,
        private countRolesUseCase: CountRolesUseCase
    ){}

    @Get()
    public async getDashboard() {
        const [ 
            usersCount, 
            projectsCount, 
            rolesCount,
            totalRevenue 
        ] = await Promise.all([
            this.countUsersUseCase.execute(),
            this.countProjectsUseCase.execute(),
            this.countRolesUseCase.execute(),
            this.getTotalRevenueUseCase.execute(),
        ])
        
        return { 
            usersCount, 
            projectsCount, 
            rolesCount,
            totalRevenue 
        }
    }

}