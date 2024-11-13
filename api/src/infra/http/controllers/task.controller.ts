import { CreateTaskUseCase } from "@application/use-cases/task/create-task/create-task.usecase";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateTaskBody } from "../dtos/task/create-task.dto";
import { FindAllTasksUseCase } from "@application/use-cases/task/find-all-tasks/find-all-tasks.usecase";
import { TaskViewModel } from "../view-models/task.viewmodel";
import { DeleteTaskUseCase } from "@application/use-cases/task/delete-task/delete-task.usecase";
import { UpdateTaskBody } from "../dtos/task/update-task.dto";
import { UpdateTaskUseCase } from "@application/use-cases/task/update-task/update-task.usecase";
import { SearchTasksByTitleUseCase } from "@application/use-cases/task/search-tasks-by-title/search-tasks-by-title.usecase";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { UserFromToken } from "../decorators/user-from-token.decorator";

@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {

    constructor(
        private createTaskUseCase: CreateTaskUseCase,
        private findAllTasksUseCase: FindAllTasksUseCase,
        private deleteTaskUseCase: DeleteTaskUseCase,
        private updateTaskUseCase: UpdateTaskUseCase,
        private searchTasksByTitleUseCase: SearchTasksByTitleUseCase
    ) { }

    @Get()
    public async getCosts(@Query('page') page = 1, @Query('limit') limit = 10) {
        const pageableTasks = await this.findAllTasksUseCase.execute(
            Number(page),
            Number(limit)
        );
        return {
            tasks: pageableTasks.data.map(TaskViewModel.toHTTP),
            meta: pageableTasks.meta
        };
    }

    @Get('/title/:title')
    public async searchByTitle(
        @Param('title') title: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        const pageableProjectsFound = await this.searchTasksByTitleUseCase.execute({
            title,
            page: Number(page),
            limit: Number(limit)
        });
        return {
            tasks: pageableProjectsFound.data.map(TaskViewModel.toHTTP),
            meta: pageableProjectsFound.meta
        };
    }

    @Post()
    public async createTask(
        @Body() body: CreateTaskBody,
        @UserFromToken() userFromToken: UserFromToken,
    ) {
        console.log('controller')
        const task = await this.createTaskUseCase.execute({
            ...body,
            requestUserId: userFromToken.id
        });
        return task;
    }

    @Put()
    public async updateTask(
        @Body() body: UpdateTaskBody,
        @UserFromToken() userFromToken: UserFromToken,
    ) {
        await this.updateTaskUseCase.execute({
            ...body,
            requestUserId: userFromToken.id
        });
    }

    @Delete(':id')
    public async deleteTask(@Param('id') id: string) {
        await this.deleteTaskUseCase.execute(id);
    }

}