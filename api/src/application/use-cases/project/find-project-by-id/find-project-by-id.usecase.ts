import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { Injectable } from "@nestjs/common";
import { User } from "@domain/entities/user/user.entity";

interface FindProjectByIdRequest {
    requestUserId: string;
    projectId: string;
}

interface CheckAbilityRequest {
    requestUser: User;
    projectOwnerId: string;
}

@Injectable()
export class FindProjectByIdUseCase {

    constructor(
        private projectRepository: ProjectRepository,
        private findUserByIdUseCase: FindUserByIdUseCase
    ) { }

    public async execute(request: FindProjectByIdRequest) {
        const { requestUserId, projectId } = request;

        const [ requestUser, project ] = await Promise.all([
            this.findUserByIdUseCase.execute({
                userId: requestUserId,
                requestUserId
            }),
            this.projectRepository.findById(projectId),
        ])

        if (!project) {
            throw new ProjectNotFoundError();
        }

        await this.checkAbility({ 
            requestUser, 
            projectOwnerId: project.getOwner().getId() 
        });

        return project;
    }

    private async checkAbility(checkRequest: CheckAbilityRequest) {
        const { requestUser, projectOwnerId } = checkRequest;
        const isAdminUser = requestUser.getRole() === 'ADMIN';
        const isOwner = requestUser.getId() === projectOwnerId;

        if (!isAdminUser && !isOwner) {
            throw new UnauthorizedUserError();
        }
    }

}