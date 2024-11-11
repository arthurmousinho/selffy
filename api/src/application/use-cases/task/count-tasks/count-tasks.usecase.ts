import { TaskRepository } from "@domain/repositories/task.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountTasksUseCase {

    constructor(
        private taskRepository: TaskRepository
    ) { }

    public async execute() {
        const count = await this.taskRepository.count();
        return count;
    }

}