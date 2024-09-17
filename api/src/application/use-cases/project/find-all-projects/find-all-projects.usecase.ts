import { ProjectRepository } from "@application/repositories/project.repository";

export class FindAllProjectsUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ){}

    public async execute() {
        return await this.projectRepository.findAll();
    }

}