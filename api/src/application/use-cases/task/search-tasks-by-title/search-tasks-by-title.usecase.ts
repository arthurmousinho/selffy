import { TaskRepository } from "@application/repositories/task.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchTasksByTitleUseCase {

    constructor(
        private taskRepository: TaskRepository
    ) { }

    public async execute(title: string) {
        const tasks = await this.taskRepository.findManyByTitle(title);
        return tasks;
    }

}