import { Project } from "@application/entities/project/project.entity";
import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { ProjectRepository } from "@application/repositories/project.repository";

export class DeleteProjectUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ) { }

    public async execute(project: Project) {
        const roleExists = await this.projectRepository.findById(project.getId());
        if (!roleExists) {
            throw new ProjectNotFoundError();
        }

        await this.projectRepository.delete(project.getId());
    }

}