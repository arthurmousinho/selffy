import { Module } from '@nestjs/common';
import { CreateCostUseCase } from './create-cost/create-cost.usecase';
import { FindAllCostsUseCase } from './find-all-costs/find-all-costs.usecase';
import { ProjectModule } from '../project/project.module';
import { DeleteCostUseCase } from './delete-cost/delete-cost.usecase';

@Module({
    imports: [
        ProjectModule
    ],
    providers: [
        CreateCostUseCase,
        FindAllCostsUseCase,
        DeleteCostUseCase
    ],
    exports: [
        CreateCostUseCase,
        FindAllCostsUseCase,
        DeleteCostUseCase
    ]
})

export class CostModule { }