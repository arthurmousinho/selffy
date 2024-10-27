import { Controller, Get, UseGuards } from "@nestjs/common";
import { GetUsersInsightsUseCase } from "@application/use-cases/user/get-users-insights/get-users-insights.usecase";
import { GetProjectsInsightsUseCase } from "@application/use-cases/project/get-projects-insights/get-projects-insights.usecase";
import { GetCostsInsightsUseCase } from "@application/use-cases/cost/get-costs-insights/get-costs-insights.usecase";
import { GetTasksInsightsUseCase } from "@application/use-cases/task/get-tasks-insights/get-tasks-insights.usecase";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "../guards/role.guard";

@ApiTags('Admin Dashboard')
@UseGuards(
    JwtAuthGuard,
    new RoleGuard('ADMIN')
)
@Controller("/admin/dashboard")
export class AdminDashboardController {

    constructor(
        private getUsersInsightsUseCase: GetUsersInsightsUseCase,
        private getProjectsInsightsUseCase: GetProjectsInsightsUseCase,
        private getCostsInsightsUseCase: GetCostsInsightsUseCase,
        private getTasksInsightsUseCase: GetTasksInsightsUseCase,
    ) { }

    @Get()
    public async getDashboard() {
        const [
            usersInsights,
            projectsInsights,
            costsInsights,
            tasksInsights,
        ] = await Promise.all([
            this.getUsersInsightsUseCase.execute(),
            this.getProjectsInsightsUseCase.execute(),
            this.getCostsInsightsUseCase.execute(),
            this.getTasksInsightsUseCase.execute(),
        ])

        return {
            users: usersInsights,
            projects: projectsInsights,
            costs: costsInsights,
            tasks: tasksInsights,
        }
    }
}
