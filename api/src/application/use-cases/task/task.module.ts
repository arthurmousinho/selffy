import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from './create-task/create-task.usecase';
import { DeleteTaskUseCase } from './delete-task/delete-task.usecase';
import { FindAllTasksUseCase } from './find-all-tasks/find-all-tasks.usecase';
import { FindTaskByIdUseCase } from './find-task-by-id/find-task-by-id.usecase';
import { UpdateTaskUseCase } from './update-task/update-task.usecase';
import { ProjectModule } from '../project/project.module';

@Module({
    imports: [
        ProjectModule
    ],
    providers: [
        CreateTaskUseCase,
        DeleteTaskUseCase,
        FindAllTasksUseCase,
        FindTaskByIdUseCase,
        UpdateTaskUseCase
    ],
    exports: [
        CreateTaskUseCase,
        DeleteTaskUseCase,
        FindAllTasksUseCase,
        FindTaskByIdUseCase,
        UpdateTaskUseCase
    ]
})

export class TaskModule { }