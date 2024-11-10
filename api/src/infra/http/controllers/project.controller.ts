import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateProjectBody } from "../dtos/project/create-project.dto";
import { CreateProjectUseCase } from "@application/use-cases/project/create-project/create-project.usecase";
import { FindAllProjectsUseCase } from "@application/use-cases/project/find-all-projects/find-all-projects.usecase";
import { ProjectViewModel } from "../view-models/project.viewmodel";
import { DeleteProjectUseCase } from "@application/use-cases/project/delete-project/delete-project.usecase";
import { UpdateProjectBody } from "../dtos/project/update-project.dto";
import { UpdateProjectUseCase } from "@application/use-cases/project/update-project/update-project.usecase";
import { SearchProjectByTitleUseCase } from "@application/use-cases/project/search-project-by-title/search-project-by-title.usecase";
import { FindProjectsByStatusParams } from "../dtos/project/find-projects-by-status.dto";
import { FindProjectsByStatusUseCase } from "@application/use-cases/project/find-projects-by-status/find-projects-by-status.usecase";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { UserFromToken } from "../decorators/user-from-token.decorator";
import { FindProjectsByOwnerIdUseCase } from "@application/use-cases/project/find-projects-by-owner-id/find-projects-by-owner-id.usecase";
import { RoleGuard } from "../guards/role.guard";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { ProjectAuthorizationService } from "@application/services/project-authorization.service";

@ApiTags('Projects')
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {

    constructor(
        private createProjectUseCase: CreateProjectUseCase,
        private findProjectsByOwnerIdUseCase: FindProjectsByOwnerIdUseCase,
        private findAllProjectsUseCase: FindAllProjectsUseCase,
        private deleteProjectUseCase: DeleteProjectUseCase,
        private updateProjectUseCase: UpdateProjectUseCase,
        private searchProjectByTitleUseCase: SearchProjectByTitleUseCase,
        private findProjectsByStatusUseCase: FindProjectsByStatusUseCase,
        private findProjectByIdUseCase: FindProjectByIdUseCase,

        private projectAuthorizationService: ProjectAuthorizationService
    ) { }

    @Get()
    @UseGuards(new RoleGuard('ADMIN'))
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

    @Get(':id')
    public async getProjectById(
        @Param('id') id: string,
        @UserFromToken() userFromToken: UserFromToken,
    ) {
        const project = await this.findProjectByIdUseCase.execute({
            requestUserId: userFromToken.id,
            projectId: id
        });

        if (project) {
            return {
                project: ProjectViewModel.toHTTP(project)
            };
        }
    }

    @Get('/owner/:id')
    public async getUserProjects(
        @Param('id') ownerId: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        const pageableProjects = await this.findProjectsByOwnerIdUseCase.execute({
            ownerId,
            page: Number(page),
            limit: Number(limit)
        });
        return {
            projects: pageableProjects.data.map(ProjectViewModel.toHTTP),
            meta: pageableProjects.meta
        };
    }

    @Post()
    public async createProject(
        @Body() body: CreateProjectBody,
        @UserFromToken() userFromToken: UserFromToken,
    ) {
        body.ownerId = body.ownerId ?? userFromToken.id;

        await this.projectAuthorizationService.checkCreateAbility({
            requestUserId: userFromToken.id,
            ownerId: body.ownerId,
        });

        const project = await this.createProjectUseCase.execute(body);
        return { project: ProjectViewModel.toHTTP(project) };
    }


    @Delete(':id')
    public async delete(
        @Param('id') id: string,
        @UserFromToken() userFromToken: UserFromToken,
    ) {
        await this.deleteProjectUseCase.execute({
            projectId: id,
            requestUserId: userFromToken.id
        });
    }

    @Put()
    public async update(@Body() body: UpdateProjectBody) {
        await this.updateProjectUseCase.execute(body);
    }

    @Get('/title/:title')
    public async searchByTitle(
        @Param('title') title: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        const pageableProjectsFound = await this.searchProjectByTitleUseCase.execute({
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
        const projectsFound = await this.findProjectsByStatusUseCase.execute(status);
        return { projects: projectsFound.map(ProjectViewModel.toHTTP) };
    }

}