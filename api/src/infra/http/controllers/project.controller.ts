import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateProjectBody } from "../dtos/project/create-project.dto";
import { CreateProjectUseCase } from "@application/use-cases/project/create-project/create-project.usecase";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { FindAllProjectsUseCase } from "@application/use-cases/project/find-all-projects/find-all-projects.usecase";
import { ProjectViewModel } from "../view-models/project.viewmodel";

@Controller('projects')
export class ProjectController {

    constructor(
        private createProjectUseCase: CreateProjectUseCase,
        private findUserByIdUseCase: FindUserByIdUseCase,
        private findAllProjectsUseCase: FindAllProjectsUseCase
    ) {}

    @Get()
    public async getProject() {
        const projects = await this.findAllProjectsUseCase.execute();
        return { projects: projects.map(ProjectViewModel.toHTTP) };
    }

    @Post()
    public async createProject(@Body() body: CreateProjectBody) {
        const { title, description, revenue, icon, color, ownerId } = body
        const owner = await this.findUserByIdUseCase.execute(ownerId);
        await this.createProjectUseCase.execute({
            title,
            description,
            revenue,
            icon,
            color,
            owner
        })
    }

}