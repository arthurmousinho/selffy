import { Cost } from "@application/entities/cost/cost";
import { CostNotFoundError } from "@application/errors/cost/cost-not-found.error";
import { CostRepository } from "@application/repositories/cost.repository";

export class DeleteCostUseCase {

    constructor(
        private costRepository: CostRepository
    ){}

    public async execute(cost: Cost) {
        const roleExists = await this.costRepository.findById(cost.getId());
        if (!roleExists) {
            throw new CostNotFoundError();
        }

        await this.costRepository.delete(cost.getId());
    }

}