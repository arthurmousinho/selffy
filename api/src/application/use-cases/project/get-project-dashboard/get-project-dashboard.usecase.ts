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

        const projectTitle = project.getTitle();
        const projectRevenue = project.getRevenue();
        const projectColor = project.getColor();
        const projectIcon = project.getIcon();

        const completedTasks = project.getTasks().filter(task => task.getStatus() === 'COMPLETED').length;
        const totalTasks = project.getTasks().length;
        const highPriorityTasks = project.getTasks().filter(task => task.getPriority() === 'HIGH').length;
        const mediumPriorityTasks = project.getTasks().filter(task => task.getPriority() === 'MEDIUM').length;
        const lowPriorityTasks = project.getTasks().filter(task => task.getPriority() === 'LOW').length;

        const totalCostsValue = project.getCosts().reduce((acc, cost) => acc + cost.getValue(), 0);
        const totalProfit = totalCostsValue - project.getRevenue();

        return {
            title: projectTitle,
            color: projectColor,
            icon: projectIcon,
            revenue: projectRevenue,
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
        };
    }

}