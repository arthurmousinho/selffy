import { TaskPriority } from "@application/entities/task/task.entity";
import { TaskRepository } from "@application/repositories/task.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountTasksByPriorityUseCase {

    constructor(
        private taskRepository: TaskRepository
    ) { }

    public async execute(priority: TaskPriority) {
        const countByPriority = await this.taskRepository.countByPriority(priority);
        return countByPriority
    }
 
}