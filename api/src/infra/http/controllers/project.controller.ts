import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateProjectBody } from "../dtos/project/create-project.dto";
import { CreateProjectUseCase } from "@application/use-cases/project/create-project/create-project.usecase";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { FindAllProjectsUseCase } from "@application/use-cases/project/find-all-projects/find-all-projects.usecase";
import { ProjectViewModel } from "../view-models/project.viewmodel";
import { DeleteProjectUseCase } from "@application/use-cases/project/delete-project/delete-project.usecase";
import { UpdateProjectBody } from "../dtos/project/update-project.dto";
import { UpdateProjectUseCase } from "@application/use-cases/project/update-project/update-project.usecase";

@Controller('projects')
export class ProjectController {

    constructor(
        private createProjectUseCase: CreateProjectUseCase,
        private findUserByIdUseCase: FindUserByIdUseCase,
        private findAllProjectsUseCase: FindAllProjectsUseCase,
        private deleteProjectUseCase: DeleteProjectUseCase,
        private updateProjectUseCase: UpdateProjectUseCase
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

    @Delete(':id')
    public async delete(@Param('id') id: string) {
        await this.deleteProjectUseCase.execute(id);
    }

    @Put()
    public async update(@Body() body: UpdateProjectBody) {
        await this.updateProjectUseCase.execute(body);
    }

}