import { CostRepository } from "@application/repositories/cost.repository";

export class FindAllCostsUseCase {

    constructor(
        private costRepository: CostRepository
    ){}

    public async execute() {
        return this.costRepository.findAll();
    }

}