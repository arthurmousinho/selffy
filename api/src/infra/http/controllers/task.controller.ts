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
import { GetTasksByProjectIdUseCase } from "@application/use-cases/task/get-tasks-by-project-id/get-tasks-by-project-id.usecase";
import { FindTaskByIdUseCase } from "@application/use-cases/task/find-task-by-id/find-task-by-id.usecase";
import { GetUserTasksGroupedByPriorityUseCase } from "@application/use-cases/task/get-user-tasks-grouped-by-priority/get-user-tasks-grouped-by-priority.usecase";
import { GenerateTaskDescriptionUseCase } from "@application/use-cases/task/generate-task-description/generate-task-description.usecase";
import { GenerateTaskDescriptionBody } from "../dtos/task/generate-task-description.dto";
import { GenerateTaskGuideUseCase } from "@application/use-cases/task/generate-task-guide/generate-task-guide.usecase";
import { GenerateTaskGuideBody } from "../dtos/task/generate-task-guide.dto";

@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {

    constructor(
        private createTaskUseCase: CreateTaskUseCase,
        private findAllTasksUseCase: FindAllTasksUseCase,
        private deleteTaskUseCase: DeleteTaskUseCase,
        private updateTaskUseCase: UpdateTaskUseCase,
        private searchTasksByTitleUseCase: SearchTasksByTitleUseCase,
        private getTasksByProjectIdUseCase: GetTasksByProjectIdUseCase,
        private findTaskByIdUseCase: FindTaskByIdUseCase,
        private getUserTasksGroupedByPriorityUseCase: GetUserTasksGroupedByPriorityUseCase,
        private generateTaskDescriptionUseCase: GenerateTaskDescriptionUseCase,
        private generateTaskGuideUseCase: GenerateTaskGuideUseCase
    ) { }

    @Get()
    public async getAllTasks(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
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

    @Get('/project/:projectId')
    public async getTasksByProjectId(
        @Param('projectId') projectId: string,
        @UserFromToken() userFromToken: UserFromToken,
    ) {
        const tasks = await this.getTasksByProjectIdUseCase.execute({
            requestUserId: userFromToken.id,
            projectId
        });
        return { tasks: tasks.map(TaskViewModel.toHTTP) };
    }

    @Get(':id')
    public async getTaskById(@Param('id') id: string) {
        const task = await this.findTaskByIdUseCase.execute(id);
        return { task: TaskViewModel.toHTTP(task) };
    }

    @Get('/user/:id/priorities')
    public async getUserTasksByPriorities(
        @Param('id') userId: string,
        @UserFromToken() userFromToken: UserFromToken
    ) {
        const tasks = await this.getUserTasksGroupedByPriorityUseCase.execute({
            requestUserId: userFromToken.id,
            userId: userId
        });
        return { tasks };
    }

    @Post()
    public async createTask(
        @Body() body: CreateTaskBody,
        @UserFromToken() userFromToken: UserFromToken,
    ) {
        const task = await this.createTaskUseCase.execute({
            ...body,
            requestUserId: userFromToken.id
        });
        return task;
    }

    @Post('/generate-description')
    public async generateTaskDescription(
        @Body() body: GenerateTaskDescriptionBody,
        @UserFromToken() userFromToken: UserFromToken,
    ) {
        const taskDescription = await this.generateTaskDescriptionUseCase.execute(body);
        return { taskDescription };
    }

    @Post('/generate-guide')
    public async generateTaskGuide(
        @Body() body: GenerateTaskGuideBody,
        @UserFromToken() userFromToken: UserFromToken,
    ) {
        const taskGuide = await this.generateTaskGuideUseCase.execute(body);
        return { taskGuide };
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