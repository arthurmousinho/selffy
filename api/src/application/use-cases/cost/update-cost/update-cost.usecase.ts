import { CostNotFoundError } from "@application/errors/cost/cost-not-found.error";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { CostRepository } from "@domain/repositories/cost.repository";
import { Injectable } from "@nestjs/common";

interface UpdateCostUseCaseRequest {
    id: string;
    title: string;
    value: number;
    projectId: string;
}

@Injectable()
export class UpdateCostUseCase {

    constructor(
        private costRepository: CostRepository,
        private findProjectByIdUseCase: FindProjectByIdUseCase
    ) { }

    public async execute(request: UpdateCostUseCaseRequest) {
        const { id, title, value, projectId } = request;
        const cost = await this.costRepository.findById(id);

        if (!cost) {
            throw new CostNotFoundError();
        }

        const project = await this.findProjectByIdUseCase.execute({
            requestUserId: cost.getProject().getOwner().getId(),
            projectId
        });

        cost.setTitle(title);
        cost.setValue(value);
        cost.setProject(project);
        cost.update();

        await this.costRepository.update(cost);
    }

}