interface AdminDashboardProps {
    totalUsers: number;
    freeUsers: number;
    premiumUsers: number;
    adminUsers: number;
    defaultUsers: number;
    usersGrowth: number;
    totalProjects: number;
    inProgressProjects: number;
    finishedProjects: number;
    totalRevenue: number;
    costsCount: number;
    costsTotalValue: number;
    tasksCount: number;
    highPriorityTasks: number;
    mediumPriorityTasks: number;
    lowPriorityTasks: number;
    pendingTasks: number;
    completedTasks: number;
    rolesCount: number;
    adminRoles: number;
    defaultRoles: number;
}

export class AdminDashboardViewModel {

    static toHTTP(dashboard: AdminDashboardProps) {
        return {
            users: {
                total: dashboard.totalUsers,
                free: dashboard.freeUsers,
                premium: dashboard.premiumUsers,
                admin: dashboard.adminUsers,
                default: dashboard.defaultUsers,
                monthlyGrowth: dashboard.usersGrowth
            },
            projects: {
                total: dashboard.totalProjects,
                inProgress: dashboard.inProgressProjects,
                finished: dashboard.finishedProjects,
                totalRevenue: dashboard.totalRevenue
            },
            costs: {
                total: dashboard.costsCount,
                totalValue: dashboard.costsTotalValue
            },
            tasks: {
                total: dashboard.tasksCount,
                highPriority: dashboard.highPriorityTasks,
                mediumPriority: dashboard.mediumPriorityTasks,
                lowPriority: dashboard.lowPriorityTasks,
                pending: dashboard.pendingTasks,
                completed: dashboard.completedTasks
            },
            roles: {
                total: dashboard.rolesCount,
                admin: dashboard.adminRoles,
                default: dashboard.defaultRoles
            }
        }
    }

}