import { Module } from '@nestjs/common';
import { CreateCostUseCase } from './create-cost/create-cost.usecase';

@Module({
    providers: [
        CreateCostUseCase
    ],
    exports: [
        CreateCostUseCase
    ]
})

export class CostModule { }