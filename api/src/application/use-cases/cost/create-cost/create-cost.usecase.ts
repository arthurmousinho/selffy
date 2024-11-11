import { Cost } from "src/domain/entities/cost/cost.entity";
import { Project } from "src/domain/entities/project/project.entity";
import { Injectable } from "@nestjs/common";
import { CostRepository } from "@domain/repositories/cost.repository";

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