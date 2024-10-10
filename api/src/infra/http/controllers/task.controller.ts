import { CreateTaskUseCase } from "@application/use-cases/task/create-task/create-task.usecase";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateTaskBody } from "../dtos/task/create-task.dto";

@Controller('tasks')
export class TaskController {

    constructor(
        private createTaskUseCase: CreateTaskUseCase
    ) { }

    @Post()
    public async createTask(@Body() body: CreateTaskBody) {
        await this.createTaskUseCase.execute(body);
    }

}