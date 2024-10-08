import { Module } from '@nestjs/common';
import { CreateCostUseCase } from './create-cost/create-cost.usecase';
import { FindAllCostsUseCase } from './find-all-costs/find-all-costs.usecase';
import { ProjectModule } from '../project/project.module';

@Module({
    imports: [
        ProjectModule
    ],
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