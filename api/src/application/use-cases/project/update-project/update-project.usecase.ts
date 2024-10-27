import { Project, ProjectStatus } from "@application/entities/project/project.entity";
import { User } from "@application/entities/user/user.entity";
import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { ProjectRepository } from "@application/repositories/project.repository";
import { Injectable } from "@nestjs/common";

interface UpdateProjectUseCaseRequest {
    id: string;
    title: string;
    description: string;
    revenue: number;
    icon: string;
    color: string;
    ownerId: string;
    status: ProjectStatus;
}

@Injectable()
export class UpdateProjectUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ) {}

    public async execute(request: UpdateProjectUseCaseRequest) {
        const {
            id,
            title,
            description,
            revenue,
            icon,
            color,
            ownerId,
            status
        } = request;

        const projectExists = await this.projectRepository.findById(id);
        if (!projectExists) {
            throw new ProjectNotFoundError();
        }

        const ownerInstance = new User({
            name: projectExists.getOwner().getName(),
            email: projectExists.getOwner().getEmail(),
            password: projectExists.getOwner().getPassword(),
            role: projectExists.getOwner().getRole(),
            createdAt: projectExists.getOwner().getCreatedAt(),
            updatedAt: projectExists.getOwner().getUpdatedAt(),
        }, ownerId);

        const projectInstance = new Project({
            title,
            description,
            revenue,
            icon,
            color,
            owner: ownerInstance,
            status,
            createdAt: projectExists.getCreatedAt(),
        }, id);

        await this.projectRepository.update(projectInstance);
    }

}