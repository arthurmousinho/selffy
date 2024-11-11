import { TaskNotFoundError } from "@application/errors/task/task-not-found.error";
import { TaskRepository } from "@domain/repositories/task.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteTaskUseCase {

    constructor(
        private taskRepository: TaskRepository
    ) { }

    public async execute(id: string) {
        const taskExists = await this.taskRepository.findById(id);
        if (!taskExists) {
            throw new TaskNotFoundError();
        }

        await this.taskRepository.delete(id);
    }

}