import { TaskRepository } from "@domain/repositories/task.repository";
import { Injectable } from "@nestjs/common";

interface SearchTasksByTitleUseCaseRequest {
    title: string;
    page: number;
    limit: number;
}

@Injectable()
export class SearchTasksByTitleUseCase {

    constructor(
        private taskRepository: TaskRepository
    ) { }

    public async execute(request: SearchTasksByTitleUseCaseRequest) {
        if (!request.page || request.page < 1) {
            request.page = 1;
        }

        if (!request.limit || request.limit < 1) {
            request.limit = 10;
        }

        return await this.taskRepository.findManyByTitle(request);
    }

}