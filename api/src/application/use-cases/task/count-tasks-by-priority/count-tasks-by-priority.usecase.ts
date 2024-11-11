import { TaskPriority } from "src/domain/entities/task/task.entity";
import { TaskRepository } from "@domain/repositories/task.repository";
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