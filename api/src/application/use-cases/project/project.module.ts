import { Module } from '@nestjs/common';

import { CreateProjectUseCase } from './create-project/create-project.usecase';
import { FindAllProjectsUseCase } from './find-all-projects/find-all-projects.usecase';
import { DeleteProjectUseCase } from './delete-project/delete-project.usecase';
import { UpdateProjectUseCase } from './update-project/update-project.usecase';
import { CountProjectsUseCase } from './count-projects/count-projects.usecase';
import { GetTotalRevenueUseCase } from './get-total-revenue/get-total-revenue.usecase';
import { SearchProjectByTitleUseCase } from './search-project-by-title/search-project-by-title.usecase';
import { CountProjectByStatusUseCase } from './count-projects-by-status/count-projects-by-status.usecase';
import { FindProjectByIdUseCase } from './find-project-by-id/find-project-by-id.usecase';
import { FindProjectsByStatusUseCase } from './find-projects-by-status/find-projects-by-status.usecase';
import { GetProjectsInsightsUseCase } from './get-projects-insights/get-projects-insights.usecase';
import { GetProjectsGrowthUseCase } from './get-projects-growth/get-projects-growth.usecase';
import { FindProjectsByOwnerIdUseCase } from './find-projects-by-owner-id/find-projects-by-owner-id.usecase';
import { UserModule } from '../user/user.module';
import { CountProjectsByOwnerIdUseCase } from './count-projects-by-owner-id/count-projects-by-owner-id.usecase';
import { GetProjectDashboardUseCase } from './get-project-dashboard/get-project-dashboard.usecase';
import { PinProjectUseCase } from './pin-project/pin-project.usecase';

@Module({
    imports: [
        UserModule
    ],
    providers: [
        CreateProjectUseCase,
        FindAllProjectsUseCase,
        DeleteProjectUseCase,
        UpdateProjectUseCase,
        CountProjectsUseCase,
        GetTotalRevenueUseCase,
        SearchProjectByTitleUseCase,
        CountProjectByStatusUseCase,
        FindProjectByIdUseCase,
        FindProjectsByStatusUseCase,
        GetProjectsInsightsUseCase,
        GetProjectsGrowthUseCase,
        FindProjectsByOwnerIdUseCase,
        CountProjectsByOwnerIdUseCase,
        GetProjectDashboardUseCase,
        PinProjectUseCase
    ],
    exports: [
        CreateProjectUseCase,
        FindAllProjectsUseCase,
        DeleteProjectUseCase,
        UpdateProjectUseCase,
        CountProjectsUseCase,
        GetTotalRevenueUseCase,
        SearchProjectByTitleUseCase,
        CountProjectByStatusUseCase,
        FindProjectByIdUseCase,
        FindProjectsByStatusUseCase,
        GetProjectsInsightsUseCase,
        GetProjectsGrowthUseCase,
        FindProjectsByOwnerIdUseCase,
        CountProjectsByOwnerIdUseCase,
        GetProjectDashboardUseCase,
        PinProjectUseCase
    ]
})

export class ProjectModule { }