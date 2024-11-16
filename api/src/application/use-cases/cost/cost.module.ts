import { Module } from '@nestjs/common';
import { CreateCostUseCase } from './create-cost/create-cost.usecase';
import { FindAllCostsUseCase } from './find-all-costs/find-all-costs.usecase';
import { ProjectModule } from '../project/project.module';
import { DeleteCostUseCase } from './delete-cost/delete-cost.usecase';
import { UpdateCostUseCase } from './update-cost/update-cost.usecase';
import { SearchCostsByTitleUseCase } from './search-costs-by-title/search-costs-by-title.usecase';
import { CountCostsUseCase } from './count-costs/count-costs.usecase';
import { GetCostsTotalValueUseCase } from './get-costs-total-value/get-costs-total-value.usecase';
import { GetCostsInsightsUseCase } from './get-costs-insights/get-costs-insights.usecase';
import { GetCostsByProjectIdUseCase } from './get-costs-by-project-id/get-costs-by-project-id.usecase';

@Module({
    imports: [
        ProjectModule
    ],
    providers: [
        CreateCostUseCase,
        FindAllCostsUseCase,
        DeleteCostUseCase,
        UpdateCostUseCase,
        SearchCostsByTitleUseCase,
        CountCostsUseCase,
        GetCostsTotalValueUseCase,
        GetCostsInsightsUseCase,
        GetCostsByProjectIdUseCase
    ],
    exports: [
        CreateCostUseCase,
        FindAllCostsUseCase,
        DeleteCostUseCase,
        UpdateCostUseCase,
        SearchCostsByTitleUseCase,
        CountCostsUseCase,
        GetCostsTotalValueUseCase,
        GetCostsInsightsUseCase,
        GetCostsByProjectIdUseCase
    ]
})

export class CostModule { }