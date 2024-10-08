import { Cost } from "@application/entities/cost/cost.entity";
import { Project } from "@application/entities/project/project.entity";
import { CostRepository } from "@application/repositories/cost.repository";
import { Injectable } from "@nestjs/common";

interface CreateCostUseCaseRequest {
    title: string;
    value: number;
    project: Project;
}

@Injectable()
export class CreateCostUseCase {

    constructor(
        private costRepository: CostRepository
    ) { }

    public async execute(request: CreateCostUseCaseRequest) {
        const { title, value, project } = request;
        const newCost = new Cost({
            title,
            value,
            project
        })

        await this.costRepository.create(newCost);
    }

}