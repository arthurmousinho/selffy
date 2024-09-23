import { Task } from "@application/entities/task/task.entity";
import { TaskAlreadyExistsError } from "@application/errors/task/task-already-exists.error";
import { TaskRepository } from "@application/repositories/task.repository";

export class CreateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository
    ) { }

    public async execute(newTask: Task) {
        const task = await this.taskRepository.findById(newTask.getId());
        if (task) {
            throw new TaskAlreadyExistsError();
        }

        await this.taskRepository.create(newTask);
    }
}