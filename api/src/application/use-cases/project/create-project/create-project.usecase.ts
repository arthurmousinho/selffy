import { Project } from "@application/entities/project/project.entity";
import { ProjectRepository } from "@application/repositories/project.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { Injectable } from "@nestjs/common";

interface CreateProjectRequest {
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
        const owner = await this.findUserByIdUseCase.execute(request.ownerId)

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

}