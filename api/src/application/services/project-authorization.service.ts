import { MaximumProjectsExceededError } from "@application/errors/project/maximum-projects-exceeded.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "@domain/repositories/project.repository";

interface CheckAbilityRequest {
    requestUserId: string;
    ownerId?: string;
}

@Injectable()
export class ProjectAuthorizationService {

    private readonly MAX_PROJECTS_FREE = 5;

    constructor(
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly projectRepository: ProjectRepository
    ) { }

    public async checkCreateAbility(request: CheckAbilityRequest) {
        const requestUser = await this.findUserByIdUseCase.execute(request.requestUserId);

        const isAdminUser = requestUser.getRole() === 'ADMIN';
        if (isAdminUser) {
            return;
        }

        const isValidAttemptFromUser = request.ownerId === requestUser.getId();
        if (!isValidAttemptFromUser) {
            throw new UnauthorizedUserError();
        }

        const isFreeUser = requestUser.getRole() === 'FREE';
        if (isFreeUser) {
            const userProjectsCount = await this.projectRepository.countByOwnerId(requestUser.getId());
            if (userProjectsCount >= this.MAX_PROJECTS_FREE) {
                throw new MaximumProjectsExceededError();
            }
        }

        return;
    }

}