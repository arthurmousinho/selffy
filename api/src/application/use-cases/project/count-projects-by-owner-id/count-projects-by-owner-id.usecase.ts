import { ProjectRepository } from "@domain/repositories/project.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountProjectsByOwnerIdUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ) { }

    public async execute(ownerId: string): Promise<number> {
        const count = await this.projectRepository.countByOwnerId(ownerId);
        return count;
    }

}