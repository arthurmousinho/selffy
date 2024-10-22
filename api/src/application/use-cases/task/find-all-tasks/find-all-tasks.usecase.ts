import { Task } from "@application/entities/task/task.entity";
import { TaskRepository } from "@application/repositories/task.repository";
import { Pageable } from "@application/types/pageable.type";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllTasksUseCase {

    constructor(
        private taskRepostitory: TaskRepository
    ){}

    public async execute(page?: number, limit?: number): Promise<Pageable<Task>> {
        if (!page || page < 1) {
            page = 1;
        }

        if (!limit || limit < 1) {
            limit = 1;
        }

        return await this.taskRepostitory.findAll(page, limit);
    }

}