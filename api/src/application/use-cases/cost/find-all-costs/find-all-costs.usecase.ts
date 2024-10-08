import { CostRepository } from "@application/repositories/cost.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllCostsUseCase {

    constructor(
        private costRepository: CostRepository
    ) { }

    public async execute() {
        return this.costRepository.findAll();
    }

}