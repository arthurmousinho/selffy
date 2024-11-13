import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { TaskRepository } from "@domain/repositories/task.repository";
import { Injectable } from "@nestjs/common";

interface GetTasksByProjectIdUseCaseRequest {
    requestUserId: string;
    projectId: string;
}

@Injectable()
export class GetTasksByProjectIdUseCase {

    constructor(
        private taskRepository: TaskRepository,
        private findProjectByIdUseCase: FindProjectByIdUseCase
    ) { }

    public async execute(request: GetTasksByProjectIdUseCaseRequest) {
        const { requestUserId, projectId } = request;
        const project = await this.findProjectByIdUseCase.execute({
            requestUserId,
            projectId
        });
        const tasks = await this.taskRepository.findManyByProjectId(project.getId());
        return tasks;
    }

}