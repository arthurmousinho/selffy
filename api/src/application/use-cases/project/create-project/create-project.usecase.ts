import { Project } from "src/domain/entities/project/project.entity";
import { Injectable } from "@nestjs/common";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { ProjectRepository } from "@domain/repositories/project.repository";

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