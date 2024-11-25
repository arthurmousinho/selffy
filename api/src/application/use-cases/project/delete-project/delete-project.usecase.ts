import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { Injectable } from "@nestjs/common";

interface DeleteProjectRequest {
    projectId: string;
    requestUserId: string;
}

@Injectable()
export class DeleteProjectUseCase {

    constructor(
        private projectRepository: ProjectRepository,
        private findUserByIdUseCase: FindUserByIdUseCase
    ) { }

    public async execute(request: DeleteProjectRequest) {
        const { projectId, requestUserId } = request;

        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            throw new ProjectNotFoundError();
        }

        const requestUser = await this.findUserByIdUseCase.execute({
            userId: requestUserId,
            requestUserId
        });
        if (requestUser.getRole() === 'ADMIN') {
            await this.projectRepository.delete(projectId);
            return;
        }

        const projectOwnerId = project.getOwner().getId();
        if (projectOwnerId !== requestUser.getId()) {
            throw new UnauthorizedUserError();
        }

        await this.projectRepository.delete(projectId);
    }

}