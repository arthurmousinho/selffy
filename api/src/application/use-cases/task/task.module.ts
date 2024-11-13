import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from './create-task/create-task.usecase';
import { DeleteTaskUseCase } from './delete-task/delete-task.usecase';
import { FindAllTasksUseCase } from './find-all-tasks/find-all-tasks.usecase';
import { FindTaskByIdUseCase } from './find-task-by-id/find-task-by-id.usecase';
import { UpdateTaskUseCase } from './update-task/update-task.usecase';
import { ProjectModule } from '../project/project.module';
import { SearchTasksByTitleUseCase } from './search-tasks-by-title/search-tasks-by-title.usecase';
import { CountTasksByPriorityUseCase } from './count-tasks-by-priority/count-tasks-by-priority.usecase';
import { CountTasksByStatusUseCase } from './count-tasks-by-status/count-tasks-by-status.usecase';
import { CountTasksUseCase } from './count-tasks/count-tasks.usecase';
import { GetTasksInsightsUseCase } from './get-tasks-insights/get-tasks-insights.usecase';
import { GetTasksGrowthUseCase } from './get-tasks-growth/get-tasks-growth.usecase';
import { UserModule } from '../user/user.module';
import { GetTasksByProjectIdUseCase } from './get-tasks-by-project-id/get-tasks-by-project-id.usecase';

@Module({
    imports: [
        ProjectModule,
        UserModule
    ],
    providers: [
        CreateTaskUseCase,
        DeleteTaskUseCase,
        FindAllTasksUseCase,
        FindTaskByIdUseCase,
        UpdateTaskUseCase,
        SearchTasksByTitleUseCase,
        CountTasksByPriorityUseCase,
        CountTasksByStatusUseCase,
        CountTasksUseCase,
        GetTasksInsightsUseCase,
        GetTasksGrowthUseCase,
        GetTasksByProjectIdUseCase
    ],
    exports: [
        CreateTaskUseCase,
        DeleteTaskUseCase,
        FindAllTasksUseCase,
        FindTaskByIdUseCase,
        UpdateTaskUseCase,
        SearchTasksByTitleUseCase,
        CountTasksByPriorityUseCase,
        CountTasksByStatusUseCase,
        CountTasksUseCase,
        GetTasksInsightsUseCase,
        GetTasksGrowthUseCase,
        GetTasksByProjectIdUseCase
    ]
})

export class TaskModule { }