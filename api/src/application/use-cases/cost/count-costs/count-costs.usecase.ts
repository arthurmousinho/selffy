import { CostRepository } from "@application/repositories/cost.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountCostsUseCase {

    constructor(
        private costsRepository: CostRepository
    ) { }

    public async execute() {
        const costsCount = await this.costsRepository.count();
        return costsCount;
    }

}