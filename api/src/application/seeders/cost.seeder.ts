import { CostRepository } from '@application/repositories/cost.repository';
import { CountCostsUseCase } from '@application/use-cases/cost/count-costs/count-costs.usecase';
import { FindAllProjectsUseCase } from '@application/use-cases/project/find-all-projects/find-all-projects.usecase';
import { PrismaCostMapper } from '@infra/database/prisma/mappers/prisma-cost.mapper';
import { PrismaProjectMapper } from '@infra/database/prisma/mappers/prisma-project.mapper';
import { PrismaUserMapper } from '@infra/database/prisma/mappers/prisma-user.mapper';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MOCK_COSTS } from 'src/mocks/cost.mock';

@Injectable()
export class CostSeeder {

    constructor(
        private costRepository: CostRepository,
        private countCostsUseCase: CountCostsUseCase,
        private findAllProjectsUseCase: FindAllProjectsUseCase,
    ) { }

    public async run() {
        const count = await this.countCostsUseCase.execute();
        if (count > 0) {
            return;
        }

        const costInstances = await Promise.all(MOCK_COSTS.map(
            async (cost) => {
                
                const randomProject = await this.getRandomProject();
                const randomProjectMappedToPrisma = PrismaProjectMapper.toPrisma(randomProject);
                const randomProjectOwnerMappedToPrisma = PrismaUserMapper.toPrisma(randomProject.getOwner());

                return PrismaCostMapper.toDomain({
                    id: randomUUID(),
                    title: cost.title,
                    value: cost.value,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    projectId: randomProjectMappedToPrisma.id,
                    project: {
                        ...randomProjectMappedToPrisma,
                        owner: randomProjectOwnerMappedToPrisma,
                    },
                })
            }
        ));

        await this.costRepository.createMany(costInstances);

    }

    private async getRandomProject() {
        const projects = await this.findAllProjectsUseCase.execute();
        const randomProject = projects.data[Math.floor(Math.random() * projects.data.length)];
        return randomProject;
    }

}