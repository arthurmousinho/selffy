import { TaskRepository } from '@domain/repositories/task.repository';
import { FindAllProjectsUseCase } from '@application/use-cases/project/find-all-projects/find-all-projects.usecase';
import { CountTasksUseCase } from '@application/use-cases/task/count-tasks/count-tasks.usecase';
import { PrismaProjectMapper } from '@infra/database/prisma/mappers/prisma-project.mapper';
import { PrismaTaskMapper } from '@infra/database/prisma/mappers/prisma-task.mapper';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MOCK_TASKS } from '@test/mocks/task.mock';

@Injectable()
export class TaskSeeder {

    constructor(
        private taskRepository: TaskRepository,
        private countTasksUseCase: CountTasksUseCase,
        private findAllProjectsUseCase: FindAllProjectsUseCase,
    ) { }

    public async run() {
        const count = await this.countTasksUseCase.execute();
        if (count > 0) {
            return;
        }

        const taskInstances = await Promise.all(MOCK_TASKS.map(
            async (cost) => {

                const randomProject = await this.getRandomProject();
                const randomProjectMappedToPrisma = PrismaProjectMapper.toPrisma(randomProject);

                return PrismaTaskMapper.toDomain({
                    id: randomUUID(),
                    title: cost.title,
                    description: cost.description,
                    completedAt: cost.completedAt,
                    dueDate: cost.dueDate,
                    priority: cost.priority,
                    status: cost.status,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    projectId: randomProjectMappedToPrisma.id,
                })
            }
        ));

        await this.taskRepository.createMany(taskInstances);

    }

    private async getRandomProject() {
        const projects = await this.findAllProjectsUseCase.execute();
        const randomProject = projects.data[Math.floor(Math.random() * projects.data.length)];
        return randomProject;
    }

}