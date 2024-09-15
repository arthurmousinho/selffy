import { Project } from "@application/entities/project/project";
import { ProjectAlreadyExistsError } from "@application/errors/project/project-already-exists.error";
import { ProjectRepository } from "@application/repositories/project.repository";

export class CreateProjectUseCase {
    constructor(
        private projectRepository: ProjectRepository
    ) {}

    public async execute(newProject: Project) {
        const project = await this.projectRepository.findById(newProject.getId());
        if (project) {
            throw new ProjectAlreadyExistsError();
        }

        await this.projectRepository.create(newProject);
    }
}