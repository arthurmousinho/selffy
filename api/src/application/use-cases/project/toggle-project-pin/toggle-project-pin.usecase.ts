import { ProjectRepository } from "@domain/repositories/project.repository";
import { Injectable } from "@nestjs/common";
import { FindProjectByIdUseCase } from "../find-project-by-id/find-project-by-id.usecase";

interface ToogleProjectPinUseCaseRequest {
    projectId: string;
    requestUserId: string;
}

@Injectable()
export class ToogleProjectPinUseCase {

    constructor(
        private projectRepository: ProjectRepository,
        private findProjectByIdUseCase: FindProjectByIdUseCase,
    ) { }

    public async execute(request: ToogleProjectPinUseCaseRequest) {
        const { projectId, requestUserId } = request;
        const project = await this.findProjectByIdUseCase.execute({
            projectId,
            requestUserId
        });

        project.setIsPinned(!project.getIsPinned());
        await this.projectRepository.update(project);
    }

}