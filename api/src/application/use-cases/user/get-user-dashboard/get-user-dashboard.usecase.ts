import { Injectable } from "@nestjs/common";
import { FindUserByIdUseCase } from "../find-user-by-id/find-user-by-id.usecase";

interface GetUserDashboardUseCaseRequest {
    requestUserId: string;
    ownerId: string;
}

@Injectable()
export class GetUserDashboardUseCase {

    constructor(private findUserByIdUseCase: FindUserByIdUseCase) { }

    public async execute(request: GetUserDashboardUseCaseRequest) {
        const user = await this.findUserByIdUseCase.execute(request.ownerId);
        const userProjects = user.getProjects();

        if (!userProjects || userProjects.length === 0) {
            return {
                completedTasks: 0,
                activeProjects: 0,
                totalRevenue: 0,
            };
        }

        const completedTasks = userProjects
            .flatMap(project => project.getTasks() || [])
            .filter(task => typeof task.getStatus === 'function' && task.getStatus() === 'COMPLETED').length;

        const activeProjects = userProjects
            .filter(project => project.getStatus() === 'IN_PROGRESS').length;

        const totalRevenue = userProjects
            .reduce((sum, project) => sum + (project.getRevenue() || 0), 0); 

        return {
            completedTasks,
            activeProjects,
            totalRevenue,
        };
    }
}
