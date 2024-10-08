import { ProjectStatus } from "@application/entities/project/project.entity";
import { ProjectRepository } from "@application/repositories/project.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountProjectByStatusUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ){}

    public async execute(status: ProjectStatus){
        const count = await this.projectRepository.countByStatus(status);
        return count;
    }

}