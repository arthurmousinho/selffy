import { Project } from "@application/entities/project/project.entity";
import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { ProjectRepository } from "@application/repositories/project.repository";

export class UpdateProjectUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ) { }

    public async execute(project: Project) {
        const taskExists = await this.projectRepository.findById(project.getId());
        if (!taskExists) {
            throw new ProjectNotFoundError();
        }

        await this.projectRepository.update(project);
    }

}