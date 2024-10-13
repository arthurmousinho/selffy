import { CountProjectByStatusUseCase } from "@application/use-cases/project/count-projects-by-status/count-projects-by-status.usecase";
import { CountProjectsUseCase } from "@application/use-cases/project/count-projects/count-projects.usecase";
import { GetTotalRevenueUseCase } from "@application/use-cases/project/get-total-revenue/get-total-revenue.usecase";
import { CountUsersByPlanUseCase } from "@application/use-cases/user/count-users-by-plan/count-users-by-plan.usecase";
import { CountUsersUseCase } from "@application/use-cases/user/count-users/count-users.usecase";
import { Controller, Get } from "@nestjs/common";
import { AdminDashboardViewModel } from "../view-models/admin-dashboard.viewmodel";
import { CountCostsUseCase } from "@application/use-cases/cost/count-costs/count-costs.usecase";
import { GetCostsTotalValueUseCase } from "@application/use-cases/cost/get-costs-total-value/get-costs-total-value.usecase";
import { CountTasksUseCase } from "@application/use-cases/task/count-tasks/count-tasks.usecase";
import { CountTasksByPriorityUseCase } from "@application/use-cases/task/count-tasks-by-priority/count-tasks-by-priority.usecase";
import { CountTasksByStatusUseCase } from "@application/use-cases/task/count-tasks-by-status/count-tasks-by-status.usecase";
import { CountUsersByTypeUseCase } from "@application/use-cases/user/count-users-by-type/count-users-by-type.usecase";
import { CountRolesUseCase } from "@application/use-cases/role/count-roles/count-roles.usecase";

@Controller("/admin/dashboard")
export class AdminDashboardController {

    constructor(
        private countUsersUseCase: CountUsersUseCase,
        private countUsersByPlanUseCase: CountUsersByPlanUseCase,
        private countUsersByTypeUseCase: CountUsersByTypeUseCase,

        private countProjectsUseCase: CountProjectsUseCase,
        private countProjectsByPlanUseCase: CountProjectByStatusUseCase,
        private getTotalRevenueUseCase: GetTotalRevenueUseCase,

        private countCostsUseCase: CountCostsUseCase,
        private getCostsTotalValueUseCase: GetCostsTotalValueUseCase,

        private countTasksUseCase: CountTasksUseCase,
        private countTasksByPriorityUseCase: CountTasksByPriorityUseCase,
        private countTasksByStatusUseCase: CountTasksByStatusUseCase,

        private countRolesUseCase: CountRolesUseCase
    ) {}

    @Get()
    public async getDashboard() {
        const [
            usersCount,
            freeUsersCount,
            premiumUsersCount,
            adminUsersCount,
            defaultUsersCount,

            projectsCount,
            inProgressProjectsCount,
            finishedProjectsCount,
            projectsTotalRevenue,

            costsCount,
            costsTotalValue,

            tasksCount,
            highPriorityTasksCount,
            mediumPriorityTasksCount,
            lowPriorityTasksCount,
            pendingTasksCount,
            completedTasksCount,

            rolesCount
        ] = await Promise.all([
            this.countUsersUseCase.execute(),
            this.countUsersByPlanUseCase.execute('FREE'),
            this.countUsersByPlanUseCase.execute('PREMIUM'),
            this.countUsersByTypeUseCase.execute('ADMIN'),
            this.countUsersByTypeUseCase.execute('DEFAULT'),

            this.countProjectsUseCase.execute(),
            this.countProjectsByPlanUseCase.execute('IN_PROGRESS'),
            this.countProjectsByPlanUseCase.execute('FINISHED'),
            this.getTotalRevenueUseCase.execute(),

            this.countCostsUseCase.execute(),
            this.getCostsTotalValueUseCase.execute(),

            this.countTasksUseCase.execute(),
            this.countTasksByPriorityUseCase.execute('HIGH'),
            this.countTasksByPriorityUseCase.execute('MEDIUM'),
            this.countTasksByPriorityUseCase.execute('LOW'),
            this.countTasksByStatusUseCase.execute('PENDING'),
            this.countTasksByStatusUseCase.execute('COMPLETED'),

            this.countRolesUseCase.execute(),
        ])

        return AdminDashboardViewModel.toHTTP({
            totalUsers: usersCount,
            freeUsers: freeUsersCount,
            premiumUsers: premiumUsersCount,
            adminUsers: adminUsersCount,
            defaultUsers: defaultUsersCount,
            totalProjects: projectsCount,
            inProgressProjects: inProgressProjectsCount,
            finishedProjects: finishedProjectsCount,
            totalRevenue: projectsTotalRevenue,
            costsCount,
            costsTotalValue,
            tasksCount,
            highPriorityTasks: highPriorityTasksCount,
            mediumPriorityTasks: mediumPriorityTasksCount,
            lowPriorityTasks: lowPriorityTasksCount,
            pendingTasks: pendingTasksCount,
            completedTasks: completedTasksCount,
            rolesCount
        })
    }

}