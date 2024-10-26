import { Injectable } from "@nestjs/common";
import { CountTasksByPriorityUseCase } from "../count-tasks-by-priority/count-tasks-by-priority.usecase";
import { CountTasksByStatusUseCase } from "../count-tasks-by-status/count-tasks-by-status.usecase";
import { CountTasksUseCase } from "../count-tasks/count-tasks.usecase";
import { GetTasksGrowthUseCase } from "../get-tasks-growth/get-tasks-growth.usecase";

export interface TasksInsights {
    total: number;
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
    pending: number;
    completed: number;
    monthlyGrowth: number;
}

@Injectable()
export class GetTasksInsightsUseCase {

    constructor(
        private countTasksUseCase: CountTasksUseCase,
        private countTasksByPriorityUseCase: CountTasksByPriorityUseCase,
        private countTasksByStatusUseCase: CountTasksByStatusUseCase,
        private getTasksGrowthUseCase: GetTasksGrowthUseCase
    ) { }

    public async execute(): Promise<TasksInsights> {
        const [
            tasksCount,
            highPriorityTasksCount,
            mediumPriorityTasksCount,
            lowPriorityTasksCount,
            pendingTasksCount,
            completedTasksCount,
            taksMonthlyGrowth
        ] = await Promise.all([
            this.countTasksUseCase.execute(),
            this.countTasksByPriorityUseCase.execute('HIGH'),
            this.countTasksByPriorityUseCase.execute('MEDIUM'),
            this.countTasksByPriorityUseCase.execute('LOW'),
            this.countTasksByStatusUseCase.execute('PENDING'),
            this.countTasksByStatusUseCase.execute('COMPLETED'),
            this.getTasksGrowthUseCase.execute('MONTHLY')
        ])

        return {
            total: tasksCount,
            highPriority: highPriorityTasksCount,
            mediumPriority: mediumPriorityTasksCount,
            lowPriority: lowPriorityTasksCount,
            pending: pendingTasksCount,
            completed: completedTasksCount,
            monthlyGrowth: taksMonthlyGrowth
        }
    }

}