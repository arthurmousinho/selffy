import { Task } from "@application/entities/task/task";
import { TaskNotFoundError } from "@application/errors/task/task-not-found.error";
import { TaskRepository } from "@application/repositories/task.repository";

export class UpdateTaskUseCase {
    
    constructor(
        private taskRepository: TaskRepository
    ) { }

    public async execute(task: Task) {
        const taskExists = await this.taskRepository.findById(task.getId());
        if (!taskExists) {
            throw new TaskNotFoundError();
        }

        await this.taskRepository.update(task);
    }

}