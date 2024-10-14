import { ProjectRepository } from "@application/repositories/project.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetTotalRevenueUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ) {}

    public async execute() {
        const sumRevenues = await this.projectRepository.sumRevenues();
        return sumRevenues;
    }

}