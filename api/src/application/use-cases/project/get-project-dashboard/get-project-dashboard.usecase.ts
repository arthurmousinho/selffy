import { Injectable } from "@nestjs/common";
import { FindProjectByIdUseCase } from "../find-project-by-id/find-project-by-id.usecase";

interface GetProjectDashboardUseCaseRequest {
    projectId: string;
    requestUserId: string;
}

@Injectable()
export class GetProjectDashboardUseCase {

    constructor(
        private findProjectByIdUseCase: FindProjectByIdUseCase
    ) { }

    public async execute(request: GetProjectDashboardUseCaseRequest) {
        const { projectId, requestUserId } = request;
    
        const project = await this.findProjectByIdUseCase.execute({
            projectId,
            requestUserId
        });

        const completedTasks = project.getTasks().filter(task => task.getStatus() === 'COMPLETED').length;
        const totalTasks = project.getTasks().length;
        const highPriorityTasks = project.getTasks().filter(task => task.getPriority() === 'HIGH').length;
        const mediumPriorityTasks = project.getTasks().filter(task => task.getPriority() === 'MEDIUM').length;
        const lowPriorityTasks = project.getTasks().filter(task => task.getPriority() === 'LOW').length;

        const totalCostsValue = project.getCosts().reduce((acc, cost) => acc + cost.getValue(), 0);
        const totalProfit = project.getRevenue() - totalCostsValue;

        return {
            project: {
                id: project.getId(),
                ownerId: project.getOwner().getId(),
                status: project.getStatus(),
                title: project.getTitle(),
                color: project.getColor(),
                icon: project.getIcon(),
                revenue: project.getRevenue(),
                description: project.getDescription(),
                createdAt: project.getCreatedAt(),
                updatedAt: project.getUpdatedAt(),
            },
            tasks: {
                total: totalTasks,
                completed: completedTasks,
                highPriority: highPriorityTasks,
                mediumPriority: mediumPriorityTasks,
                lowPriority: lowPriorityTasks,
            },
            costs: {
                totalValue: totalCostsValue,
                totalProfit,
            }
        }
    }

}