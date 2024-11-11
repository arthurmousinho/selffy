import { CostNotFoundError } from "@application/errors/cost/cost-not-found.error";
import { CostRepository } from "@domain/repositories/cost.repository";

export class FindCostByIdUseCase {

    constructor(
        private costRepository: CostRepository
    ) { }

    public async execute(id: string) {
        const cost = await this.costRepository.findById(id);
        if (!cost) {
            throw new CostNotFoundError();
        }

        return cost;
    }

}