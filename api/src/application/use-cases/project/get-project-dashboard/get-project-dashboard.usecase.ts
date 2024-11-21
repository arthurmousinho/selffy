import { Injectable } from "@nestjs/common";
import { FindProjectByIdUseCase } from "../find-project-by-id/find-project-by-id.usecase";
import { Task } from "@domain/entities/task/task.entity";

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
            requestUserId,
        });

        const tasks = project.getTasks();
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.getStatus() === 'COMPLETED').length;

        // Grouping tasks by priority using reduce
        const { HIGH: highPriorityTasks, MEDIUM: mediumPriorityTasks, LOW: lowPriorityTasks } = tasks.reduce(
            (acc, task) => {
                const priority = task.getPriority();
                acc[priority] = (acc[priority] || 0) + 1;
                return acc;
            },
            { HIGH: 0, MEDIUM: 0, LOW: 0 }
        );

        const totalCostsValue = project.getCosts().reduce((acc, cost) => acc + cost.getValue(), 0);
        const totalProfit = project.getRevenue() - totalCostsValue;

        const tasksProductivityDuringCurrentWeek = this.calculateWeeklyProductivity(tasks);

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
                isPinned: project.getIsPinned(),
            },
            tasks: {
                total: totalTasks,
                completed: completedTasks,
                highPriority: highPriorityTasks,
                mediumPriority: mediumPriorityTasks,
                lowPriority: lowPriorityTasks,
                productivity: tasksProductivityDuringCurrentWeek,
            },
            costs: {
                totalValue: totalCostsValue,
                totalProfit,
            }
        };
    }

    private calculateWeeklyProductivity(tasks: Task[]): Record<string, number> {
        const daysOfWeek = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        ];

        const initialProductivity = daysOfWeek.reduce(
            (acc, day) => ({ ...acc, [day]: 0 }),
            {}
        );

        return tasks
            .filter(task => task.getStatus() === 'COMPLETED')
            .reduce((acc, task) => {
                const taskCompletedAt = task.getCompletedAt()
                
                if (!taskCompletedAt) {
                    return acc;
                }
                const completedDay = daysOfWeek[new Date(taskCompletedAt).getDay()];
                acc[completedDay]++;
                return acc;
            }, initialProductivity);
    }

}