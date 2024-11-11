import { ProjectStatus } from "src/domain/entities/project/project.entity";
import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "@domain/repositories/project.repository";

@Injectable()
export class CountProjectByStatusUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ) { }

    public async execute(status: ProjectStatus) {
        const count = await this.projectRepository.countByStatus(status);
        return count;
    }

}