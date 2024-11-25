import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { User } from "@domain/entities/user/user.entity";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { Injectable } from "@nestjs/common";

interface FindProjectsByOwnerIdUseCaseRequest {
    page?: number;
    limit?: number;
    ownerId: string;
    requestUserId: string;
}

interface CheckAbilityRequest {
    requestUser: User;
    owner: User;
}

@Injectable()
export class FindProjectsByOwnerIdUseCase {

    constructor(
        private projectRepository: ProjectRepository,
        private findUserByIdUseCase: FindUserByIdUseCase
    ) { }

    public async execute(request: FindProjectsByOwnerIdUseCaseRequest) {
        const [requestUser, owner] = await Promise.all([
            await this.findUserByIdUseCase.execute(request.requestUserId),
            await this.findUserByIdUseCase.execute(request.ownerId),
        ])

        await this.checkAbility({ requestUser, owner });

        const pageableProjects = await this.projectRepository.findByOwnerId({
            ownerId: request.ownerId,
            page: request.page,
            limit: request.limit
        });

        return pageableProjects;
    }

    private async checkAbility(checkAbility: CheckAbilityRequest) {
        const { requestUser, owner } = checkAbility;

        const role = requestUser.getRole();

        if (role === 'ADMIN') {
            return;
        }

        if (requestUser.getId() !== owner.getId()) {
            throw new UnauthorizedUserError();
        }
    }

}