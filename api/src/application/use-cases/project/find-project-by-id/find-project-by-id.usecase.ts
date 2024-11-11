import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { Injectable } from "@nestjs/common";

interface FindProjectByIdRequest {
    requestUserId: string;
    projectId: string;
}

@Injectable()
export class FindProjectByIdUseCase {

    constructor(
        private projectRepository: ProjectRepository,
        private findUserByIdUseCase: FindUserByIdUseCase
    ) { }

    public async execute(request: FindProjectByIdRequest) {
        const { requestUserId, projectId } = request;

        const requstUser = await this.findUserByIdUseCase.execute(requestUserId);

        const isAdminUser = requstUser.getRole() === 'ADMIN';
        const isOwner = requstUser.getId() === projectId;

        if (isAdminUser || isOwner) {
            const project = await this.projectRepository.findById(projectId);
            if (!project) {
                throw new ProjectNotFoundError();
            }

            return project;
        }

        throw new UnauthorizedUserError();
    }

}