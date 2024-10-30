import { Project } from "@application/entities/project/project.entity";
import { MaximumProjectsExceededError } from "@application/errors/project/maximum-projects-exceeded.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { ProjectRepository } from "@application/repositories/project.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { Injectable } from "@nestjs/common";

interface CreateProjectRequest {
    requestUserId: string;
    ownerId: string;
    title: string;
    description: string;
    revenue: number;
    icon: string;
    color: string;
}

@Injectable()
export class CreateProjectUseCase {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
    ) { }

    public async execute(request: CreateProjectRequest): Promise<Project> {
        const [owner, requestUser] = await Promise.all([
            this.findUserByIdUseCase.execute(request.ownerId),
            this.findUserByIdUseCase.execute(request.requestUserId)
        ]);

        const newProject = new Project({
            title: request.title,
            description: request.description,
            revenue: request.revenue,
            owner,
            color: request.color,
            icon: request.icon,
        });

        if (requestUser.getRole() === 'ADMIN') {
            await this.projectRepository.create(newProject);
            return newProject;
        }

        if (requestUser.getId() !== request.ownerId) {
            throw new UnauthorizedUserError();
        }

        if (requestUser.getRole() === 'FREE') {
            const userProjectsCount = await this.projectRepository.countByOwnerId(request.ownerId);
            const maxProjectsAllowed = 5;
            if (userProjectsCount >= maxProjectsAllowed) {
                throw new MaximumProjectsExceededError();
            }
        }

        await this.projectRepository.create(newProject);
        return newProject;
    }

}