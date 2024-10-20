import { ProjectRepository } from "@application/repositories/project.repository"
import { CreateProjectUseCase } from "@application/use-cases/project/create-project/create-project.usecase";
import { FindAllUsersUseCase } from "@application/use-cases/user/find-all-users/find-all-users.usecase";
import { Injectable } from "@nestjs/common";
import { MOCK_PROJECTS } from "src/mocks/project.mock";

@Injectable()
export class ProjectSeeder {

    constructor(
        private projectRepository: ProjectRepository,
        private createPrejectUseCase: CreateProjectUseCase,
        private findAllUsersUseCase: FindAllUsersUseCase
    ) { }

    public async run() {
        const projectsCount = await this.projectRepository.count();
        if (projectsCount > 0) {
            return;
        }

        // TODO: Create createMany() in ProjectRepository
 
        MOCK_PROJECTS.map(async (project) => {
            await this.createPrejectUseCase.execute({
                owner: await this.getRandomUser(),
                title: project.title,
                description: project.description,
                revenue: project.revenue,
                icon: project.icon,
                color: project.color,
            });
        });

    }

    private async getRandomUser() {
        const users = await this.findAllUsersUseCase.execute();
        const randomUser = users.data[Math.floor(Math.random() * users.data.length)];
        return randomUser;
    }

}