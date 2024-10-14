import { Injectable } from "@nestjs/common";
import { CountCostsUseCase } from "../count-costs/count-costs.usecase";
import { GetCostsTotalValueUseCase } from "../get-costs-total-value/get-costs-total-value.usecase";

export interface CostsInsights {
    tatal: number;
    totalValue: number;
}

@Injectable()
export class GetCostsInsightsUseCase {

    constructor(
        private countCostsUseCase: CountCostsUseCase,
        private getCostsTotalValueUseCase: GetCostsTotalValueUseCase,
    ) { }

    public async execute(): Promise<CostsInsights> {
        const [ 
            costsCount,
            costsTotalValue
        ] = await Promise.all([
            this.countCostsUseCase.execute(),
            this.getCostsTotalValueUseCase.execute(),
        ])

        return {
            tatal: costsCount,
            totalValue: costsTotalValue
        }
    }

}