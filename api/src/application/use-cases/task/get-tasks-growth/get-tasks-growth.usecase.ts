import { TaskRepository } from "@domain/repositories/task.repository";
import { Injectable } from "@nestjs/common";
import { subDays, subWeeks, subMonths } from 'date-fns';


@Injectable()
export class GetTasksGrowthUseCase {

    constructor(
        private taskRepository: TaskRepository
    ) { }

    public async execute(type: 'MONTHLY' | 'WEEKLY' | 'DAILY'): Promise<number> {
        let dateFrom: Date;

        switch (type) {
            case 'DAILY':
                dateFrom = subDays(new Date(), 1);
                break;
            case 'WEEKLY':
                dateFrom = subWeeks(new Date(), 1);
                break;
            case 'MONTHLY':
                dateFrom = subMonths(new Date(), 1);
                break;
            default:
                throw new Error('Invalid type provided');
        }

       const tasksCreatedInPeriod = await this.taskRepository.countTasksCreatedAfter(dateFrom);
       return tasksCreatedInPeriod;
    }

}