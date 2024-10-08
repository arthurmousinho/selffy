import { Cost } from "@application/entities/cost/cost.entity";
import { CostAlreadyExistsError } from "@application/errors/cost/cost-already-exists.error";
import { CostRepository } from "@application/repositories/cost.repository";
import { Injectable } from "@nestjs/common";

interface CreateCostUseCaseRequest {
    title: string;
    value: number;
}

@Injectable()
export class CreateCostUseCase {

    constructor(
        private costRepository: CostRepository
    ) { }

    public async execute(request: CreateCostUseCaseRequest) {
        const { title, value } = request;
        const newCost = new Cost({
            title,
            value
        })

        await this.costRepository.create(newCost);
    }

}