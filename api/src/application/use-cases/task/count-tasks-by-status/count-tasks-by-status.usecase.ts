import { TaskStatus } from "@application/entities/task/task.entity";
import { TaskRepository } from "@application/repositories/task.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountTasksByStatusUseCase {

    constructor(
        private taskRepository: TaskRepository
    ) { }

    public async execute(status: TaskStatus) {
        const countByStatus = await this.taskRepository.countByStatus(status);
        return countByStatus;
    }
 
}