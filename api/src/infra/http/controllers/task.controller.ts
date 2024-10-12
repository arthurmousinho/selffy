import { CreateTaskUseCase } from "@application/use-cases/task/create-task/create-task.usecase";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateTaskBody } from "../dtos/task/create-task.dto";
import { FindAllTasksUseCase } from "@application/use-cases/task/find-all-tasks/find-all-tasks.usecase";
import { TaskViewModel } from "../view-models/task.viewmodel";
import { DeleteTaskUseCase } from "@application/use-cases/task/delete-task/delete-task.usecase";
import { UpdateTaskBody } from "../dtos/task/update-task.dto";
import { UpdateTaskUseCase } from "@application/use-cases/task/update-task/update-task.usecase";
import { SearchTasksByTitleUseCase } from "@application/use-cases/task/search-tasks-by-title/search-tasks-by-title.usecase";

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
    public async getTasks() {
        const tasks = await this.findAllTasksUseCase.execute();
        return { tasks: tasks.map(TaskViewModel.toHTTP) };
    }

    @Get(':title')
    public async getTaskByTitle(@Param('title') title: string) {
        const tasks = await this.searchTasksByTitleUseCase.execute(title);
        return { tasks: tasks.map(TaskViewModel.toHTTP) };
    }

    @Post()
    public async createTask(@Body() body: CreateTaskBody) {
        await this.createTaskUseCase.execute(body);
    }

    @Put()
    public async updateTask(@Body() body: UpdateTaskBody) {
        await this.updateTaskUseCase.execute(body);
    }

    @Delete(':id')
    public async deleteTask(@Param('id') id: string) {
        await this.deleteTaskUseCase.execute(id);
    }

}