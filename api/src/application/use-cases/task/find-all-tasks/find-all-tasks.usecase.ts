import { TaskRepository } from "@application/repositories/task.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllTasksUseCase {

    constructor(
        private taskRepostitory: TaskRepository
    ){}

    public async execute() {
        return await this.taskRepostitory.findAll();
    }

}