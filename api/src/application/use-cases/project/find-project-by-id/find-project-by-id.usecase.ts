import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { ProjectRepository } from "@application/repositories/project.repository";

export class FindProjectByIdUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ){}

    public async execute(id: string) {
        const task = await this.projectRepository.findById(id);
        if (!task) {
            throw new ProjectNotFoundError();
        }

        return task;
    }

}