import { Project } from "@application/entities/project/project.entity";
import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { ProjectRepository } from "@application/repositories/project.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteProjectUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ) {}

    public async execute(id: string) {
        const projectExists = await this.projectRepository.findById(id);
        console.log(projectExists);
        if (!projectExists) {
            throw new ProjectNotFoundError();
        }

        await this.projectRepository.delete(id);
    }

}