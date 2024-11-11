import { ProjectRepository } from "@domain/repositories/project.repository";
import { Injectable } from "@nestjs/common";
import { ProjectStatus } from "@prisma/client";

@Injectable()
export class FindProjectsByStatusUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ) { }

    public async execute(status: ProjectStatus) {
        const projects = await this.projectRepository.findByStatus(status);
        return projects;
    }

}