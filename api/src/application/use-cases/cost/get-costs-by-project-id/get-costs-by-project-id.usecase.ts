import { CostRepository } from "@domain/repositories/cost.repository";
import { Injectable } from "@nestjs/common";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";

interface GetCostsByProjectIdUseCaseRequest {
    projectId: string;
    requestUserId: string;
}

@Injectable()
export class GetCostsByProjectIdUseCase {

    constructor(
        private costRepository: CostRepository,
        private findProjectByIdUseCase: FindProjectByIdUseCase
    ) { }

    public async execute(request: GetCostsByProjectIdUseCaseRequest) {
        const { projectId, requestUserId } = request;

        const project = await this.findProjectByIdUseCase.execute({
            projectId,
            requestUserId
        });

        const costs = await this.costRepository.findManyByProjectId(project.getId());
        return costs;
    }

}