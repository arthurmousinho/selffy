import { Task } from "src/domain/entities/task/task.entity";
import { TaskRepository } from "@domain/repositories/task.repository";
import { Pageable } from "@application/shared/pageable.type";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllTasksUseCase {

    constructor(
        private taskRepostitory: TaskRepository
    ) { }

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