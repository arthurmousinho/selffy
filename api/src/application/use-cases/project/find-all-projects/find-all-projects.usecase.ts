import { Project } from "src/domain/entities/project/project.entity";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { Pageable } from "@application/shared/pageable.type";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllProjectsUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ) { }

    public async execute(page?: number, limit?: number): Promise<Pageable<Project>> {
        if (!page || page < 1) {
            page = 1;
        }

        if (!limit || limit < 1) {
            limit = 1;
        }

        return await this.projectRepository.findAll(page, limit);
    }

}