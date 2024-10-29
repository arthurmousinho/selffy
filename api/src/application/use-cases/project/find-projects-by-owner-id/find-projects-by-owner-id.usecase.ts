import { ProjectRepository } from "@application/repositories/project.repository";
import { Injectable } from "@nestjs/common";

interface FindProjectsByOwnerIdUseCaseRequest {
    page: number;
    limit: number;
    ownerId: string;
}

@Injectable()
export class FindProjectsByOwnerIdUseCase {

    constructor(
        private projectRepository: ProjectRepository
    ) { }

    public async execute(request: FindProjectsByOwnerIdUseCaseRequest) {
        const pageableProjects = await this.projectRepository.findByOwnerId({
            ownerId: request.ownerId,
            page: request.page,
            limit: request.limit,
        });

        return pageableProjects;
    }

}