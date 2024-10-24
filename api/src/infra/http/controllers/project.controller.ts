import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateProjectBody } from "../dtos/project/create-project.dto";
import { CreateProjectUseCase } from "@application/use-cases/project/create-project/create-project.usecase";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { FindAllProjectsUseCase } from "@application/use-cases/project/find-all-projects/find-all-projects.usecase";
import { ProjectViewModel } from "../view-models/project.viewmodel";
import { DeleteProjectUseCase } from "@application/use-cases/project/delete-project/delete-project.usecase";
import { UpdateProjectBody } from "../dtos/project/update-project.dto";
import { UpdateProjectUseCase } from "@application/use-cases/project/update-project/update-project.usecase";
import { SearchProjectByTitleUseCase } from "@application/use-cases/project/search-project-by-title/search-project-by-title.usecase";
import { FindProjectsByStatusParams } from "../dtos/project/find-projects-by-status.dto";
import { FindProjectsByStatusUseCase } from "@application/use-cases/project/find-projects-by-status/find-projects-by-status.usecase";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {

    constructor(
        private createProjectUseCase: CreateProjectUseCase,
        private findUserByIdUseCase: FindUserByIdUseCase,
        private findAllProjectsUseCase: FindAllProjectsUseCase,
        private deleteProjectUseCase: DeleteProjectUseCase,
        private updateProjectUseCase: UpdateProjectUseCase,
        private searchProjectByTitle: SearchProjectByTitleUseCase,
        private findProjectsByStatus: FindProjectsByStatusUseCase
    ) { }

    @Get()
    public async getProjects(@Query('page') page = 1, @Query('limit') limit = 10) {
        const pageableProjects = await this.findAllProjectsUseCase.execute(
            Number(page),
            Number(limit)
        );
        return {
            projects: pageableProjects.data.map(ProjectViewModel.toHTTP),
            meta: pageableProjects.meta
        };
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

    @Get(':title')
    public async searchByTitle(
        @Param('title') title: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        const pageableProjectsFound = await this.searchProjectByTitle.execute({
            title,
            page: Number(page),
            limit: Number(limit)
        });
        return {
            projects: pageableProjectsFound.data.map(ProjectViewModel.toHTTP),
            meta: pageableProjectsFound.meta
        };
    }


    @Get('/status/:status')
    @UsePipes(new ValidationPipe({ transform: true }))
    public async findProjectByStatus(@Param() params: FindProjectsByStatusParams) {
        const { status } = params;
        const projectsFound = await this.findProjectsByStatus.execute(status);
        return { projects: projectsFound.map(ProjectViewModel.toHTTP) };
    }

}