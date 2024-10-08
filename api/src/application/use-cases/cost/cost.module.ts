import { Module } from '@nestjs/common';
import { CreateCostUseCase } from './create-cost/create-cost.usecase';
import { FindAllCostsUseCase } from './find-all-costs/find-all-costs.usecase';

@Module({
    providers: [
        CreateCostUseCase,
        FindAllCostsUseCase
    ],
    exports: [
        CreateCostUseCase,
        FindAllCostsUseCase
    ]
})

export class CostModule { }