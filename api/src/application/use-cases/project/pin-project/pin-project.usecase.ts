import { ProjectRepository } from "@domain/repositories/project.repository";
import { Injectable } from "@nestjs/common";
import { FindProjectByIdUseCase } from "../find-project-by-id/find-project-by-id.usecase";

interface PinProjectUseCaseRequest {
    projectId: string;
    requestUserId: string;
}

@Injectable()
export class PinProjectUseCase {

    constructor(
        private projectRepository: ProjectRepository,
        private findProjectByIdUseCase: FindProjectByIdUseCase,
    ) { }

    public async execute(request: PinProjectUseCaseRequest) {
        const { projectId, requestUserId } = request;
        const project = await this.findProjectByIdUseCase.execute({
            projectId,
            requestUserId
        });

        project.setIsPinned(true);
        await this.projectRepository.update(project);
    }

}