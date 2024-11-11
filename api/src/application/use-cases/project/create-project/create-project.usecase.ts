import { Project } from "@domain/entities/project/project.entity";
import { Injectable } from "@nestjs/common";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { MaximumProjectsExceededError } from "@application/errors/project/maximum-projects-exceeded.error";
import { User } from "@domain/entities/user/user.entity";

interface CreateProjectRequest {
    requestUserId: string;
    ownerId: string;
    title: string;
    description: string;
    revenue: number;
    icon: string;
    color: string;
}

interface CheckAbilityRequest {
    requestUser: User;
    owner: User;
}

@Injectable()
export class CreateProjectUseCase {

    private MAX_PROJECTS_FREE = 5;

    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
    ) { }

    public async execute(request: CreateProjectRequest): Promise<Project> {
        const [ requestUser, owner ] = await Promise.all([
            await this.findUserByIdUseCase.execute(request.requestUserId),
            await this.findUserByIdUseCase.execute(request.ownerId),
        ])

        await this.checkAbility({ requestUser, owner });

        const newProject = new Project({
            title: request.title,
            description: request.description,
            revenue: request.revenue,
            owner,
            color: request.color,
            icon: request.icon,
        });

        await this.projectRepository.create(newProject);
        return newProject;
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

        if (role === 'FREE') {
            const userProjectsCount = await this.projectRepository.countByOwnerId(owner.getId());
            if (userProjectsCount >= this.MAX_PROJECTS_FREE) {
                throw new MaximumProjectsExceededError();
            }
        }
    }

}