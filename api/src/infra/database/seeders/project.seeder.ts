import { ProjectRepository } from "@domain/repositories/project.repository";
import { FindAllUsersUseCase } from "@application/use-cases/user/find-all-users/find-all-users.usecase";
import { PrismaProjectMapper } from "@infra/database/prisma/mappers/prisma-project.mapper";
import { PrismaUserMapper } from "@infra/database/prisma/mappers/prisma-user.mapper";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { MOCK_PROJECTS } from "@test/mocks/project.mock";

@Injectable()
export class ProjectSeeder {

    constructor(
        private projectRepository: ProjectRepository,
        private findAllUsersUseCase: FindAllUsersUseCase
    ) { }

    public async run() {
        const projectsCount = await this.projectRepository.count();
        if (projectsCount > 0) {
            return;
        }

        const projectsInstaces = await Promise.all(MOCK_PROJECTS.map(
            async (project) => {
                const randomUser = await this.getRandomUser();
                const randomUserMappedToPrisma = PrismaUserMapper.toPrisma(randomUser);

                return PrismaProjectMapper.toDomain({
                    id: randomUUID(),
                    title: project.title,
                    description: project.description,
                    status: project.status,
                    revenue: project.revenue,
                    icon: project.icon,
                    color: project.color,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    owner: randomUserMappedToPrisma,
                    ownerId: randomUserMappedToPrisma.id,
                });
            }
        ));

        await this.projectRepository.createMany(projectsInstaces);
    }

    private async getRandomUser() {
        const users = await this.findAllUsersUseCase.execute();
        const randomUser = users.data[Math.floor(Math.random() * users.data.length)];
        return randomUser;
    }
}
