import { CostRepository } from "@domain/repositories/cost.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetCostsTotalValueUseCase {

    constructor(
        private costsRepository: CostRepository
    ) { }

    public async execute() {
        const totalValuesSum = await this.costsRepository.sumValues();
        return totalValuesSum;
    }

}