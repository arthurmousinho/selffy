import { Cost } from "@application/entities/cost/cost.entity";
import { CostNotFoundError } from "@application/errors/cost/cost-not-found.error";
import { CostRepository } from "@application/repositories/cost.repository";

export class UpdateCostUseCase {

    constructor(
        private costRepository: CostRepository
    ) { }

    public async execute(cost: Cost) {
        const costExists = await this.costRepository.findById(cost.getId());
        if (!costExists) {
            throw new CostNotFoundError();
        }

        await this.costRepository.update(cost);
    }

}