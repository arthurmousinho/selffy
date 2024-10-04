import { ProjectRepository } from "@application/repositories/project.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllProjectsUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ){}

    public async execute() {
        return await this.projectRepository.findAll();
    }

}