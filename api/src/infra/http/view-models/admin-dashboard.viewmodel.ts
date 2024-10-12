interface AdminDashboardProps {
    totalUsers: number;
    freeUsers: number;
    premiumUsers: number;
    totalProjects: number;
    inProgressProjects: number;
    finishedProjects: number;
    totalRevenue: number;
    costsCount: number;
    costsTotalValue: number;
}

export class AdminDashboardViewModel {

    static toHTTP(dashboard: AdminDashboardProps) {
        return {
            users: {
                total: dashboard.totalUsers,
                free: dashboard.freeUsers,
                premium: dashboard.premiumUsers
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
            }
        }
    }

}