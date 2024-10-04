import { ProjectRepository } from "@application/repositories/project.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetTotalRevenueUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ) {}

    public async execute() {
        const projects = await this.projectRepository.findAll();
        return projects.reduce((total, project) => total + project.getRevenue(), 0);
    }

}