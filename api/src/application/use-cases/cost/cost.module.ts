import { Module } from '@nestjs/common';
import { CreateCostUseCase } from './create-cost/create-cost.usecase';
import { FindAllCostsUseCase } from './find-all-costs/find-all-costs.usecase';
import { ProjectModule } from '../project/project.module';
import { DeleteCostUseCase } from './delete-cost/delete-cost.usecase';
import { UpdateCostUseCase } from './update-cost/update-cost.usecase';

@Module({
    imports: [
        ProjectModule
    ],
    providers: [
        CreateCostUseCase,
        FindAllCostsUseCase,
        DeleteCostUseCase,
        UpdateCostUseCase
    ],
    exports: [
        CreateCostUseCase,
        FindAllCostsUseCase,
        DeleteCostUseCase,
        UpdateCostUseCase
    ]
})

export class CostModule { }