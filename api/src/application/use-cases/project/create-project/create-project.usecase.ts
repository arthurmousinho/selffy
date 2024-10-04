import { Project } from "@application/entities/project/project.entity";
import { User } from "@application/entities/user/user.entity";
import { ProjectRepository } from "@application/repositories/project.repository";
import { Injectable } from "@nestjs/common";

interface CraeteProjectRequest {
    owner: User;
    title: string;
    description: string;
    revenue: number;
    icon: string;
    color: string;
}

@Injectable()
export class CreateProjectUseCase {
    
    constructor(
        private projectRepository: ProjectRepository
    ) {}

    public async execute(request: CraeteProjectRequest) {
        const { title, description, revenue, icon, color, owner } = request;
        const newProject = new Project({
            title,
            description,
            revenue,
            owner,
            color,
            icon
        })
        await this.projectRepository.create(newProject);
    }

}