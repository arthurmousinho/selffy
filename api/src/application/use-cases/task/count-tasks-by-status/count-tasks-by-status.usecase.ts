import { TaskStatus } from "src/domain/entities/task/task.entity";
import { TaskRepository } from "@domain/repositories/task.repository";
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