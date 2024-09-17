import { TaskRepository } from "@application/repositories/task.repository";

export class FindAllTasksUseCase {

    constructor(
        private taskRepostitory: TaskRepository
    ){}

    public async execute() {
        return await this.taskRepostitory.findAll();
    }

}