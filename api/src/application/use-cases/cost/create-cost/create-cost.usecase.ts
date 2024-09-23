import { Cost } from "@application/entities/cost/cost.entity";
import { CostAlreadyExistsError } from "@application/errors/cost/cost-already-exists.error";
import { CostRepository } from "@application/repositories/cost.repository";

export class CreateCostUseCase {

    constructor(
        private costRepository: CostRepository
    ) { }

    public async execute(cost: Cost) {
        const costExists = await this.costRepository.findById(cost.getId());
        if (costExists) {
            throw new CostAlreadyExistsError();
        }

        await this.costRepository.create(cost);
    }

}