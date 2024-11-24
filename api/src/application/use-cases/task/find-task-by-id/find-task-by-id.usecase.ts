import { TaskNotFoundError } from "@application/errors/task/task-not-found.error";
import { TaskRepository } from "@domain/repositories/task.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindTaskByIdUseCase {

    constructor(
        private taskRepository: TaskRepository
    ){}

    public async execute(id: string){
        const task = await this.taskRepository.findById(id)
        if (!task) {
            throw new TaskNotFoundError();
        }

        return task;
    }

}