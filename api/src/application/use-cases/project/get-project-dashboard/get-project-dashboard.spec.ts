import { GetProjectDashboardUseCase } from "./get-project-dashboard.usecase";
import { FindProjectByIdUseCase } from "../find-project-by-id/find-project-by-id.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { makeUser } from "@test/factories/user.factory";
import { makeProject } from "@test/factories/project.factory";
import { makeTask } from "@test/factories/task.factory";
import { makeCost } from "@test/factories/cost.factory";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";

describe('GetProjectDashboardUseCase', () => {
    let getProjectDashboardUseCase: GetProjectDashboardUseCase;
    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let findUserByIdUseCase: FindUserByIdUseCase;

    let userRepository: InMemoryUserRepository;
    let projectRepository: InMemoryProjectRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        userRepository = new InMemoryUserRepository();

        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository, findUserByIdUseCase);
        getProjectDashboardUseCase = new GetProjectDashboardUseCase(findProjectByIdUseCase);
    });

    it('should return project dashboard data correctly', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const project = makeProject({ owner });

        const tasks = [
            makeTask({
                status: 'COMPLETED',
                priority: 'HIGH',
                completedAt: new Date('2024-11-13T10:00:00Z'), // Wednesday
            }),
            makeTask({
                status: 'COMPLETED',
                priority: 'MEDIUM',
                completedAt: new Date('2024-11-12T10:00:00Z'), // Tuesday
            }),
            makeTask({ status: 'PENDING', priority: 'LOW' }),
        ];
        tasks.forEach(task => project.addTask(task));

        const costs = [
            makeCost({ value: 100 }),
            makeCost({ value: 200 }),
        ];
        costs.forEach(cost => project.addCost(cost));

        await projectRepository.create(project);

        const result = await getProjectDashboardUseCase.execute({
            projectId: project.getId(),
            requestUserId: owner.getId(),
        });

        expect(result.project).toEqual({
            id: project.getId(),
            ownerId: owner.getId(),
            status: project.getStatus(),
            title: project.getTitle(),
            color: project.getColor(),
            icon: project.getIcon(),
            revenue: project.getRevenue(),
            description: project.getDescription(),
            createdAt: project.getCreatedAt(),
            updatedAt: project.getUpdatedAt(),
        });

        expect(result.tasks).toEqual({
            total: 3,
            completed: 2,
            highPriority: 1,
            mediumPriority: 1,
            lowPriority: 1,
            productivity: {
                Sunday: 0,
                Monday: 0,
                Tuesday: 1,
                Wednesday: 1,
                Thursday: 0,
                Friday: 0,
                Saturday: 0,
            },
        });

        expect(result.costs).toEqual({
            totalValue: 300,
            totalProfit: project.getRevenue() - 300,
        });
    });

    it('should throw UnauthorizedUserError if the user does not have permission', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const unauthorizedUser = makeUser();
        await userRepository.create(unauthorizedUser);

        const project = makeProject({ owner });
        await projectRepository.create(project);

        await expect(getProjectDashboardUseCase.execute({
            projectId: project.getId(),
            requestUserId: unauthorizedUser.getId(),
        })).rejects.toThrow(UnauthorizedUserError);
    });

    it('should throw ProjectNotFoundError if the project does not exist', async () => {
        const user = makeUser();
        await userRepository.create(user);

        await expect(getProjectDashboardUseCase.execute({
            projectId: 'non-existent-project-id',
            requestUserId: user.getId(),
        })).rejects.toThrow(ProjectNotFoundError);
    });

    it('should return correct data for a project with no tasks or costs', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const project = makeProject({ owner });
        await projectRepository.create(project);

        const result = await getProjectDashboardUseCase.execute({
            projectId: project.getId(),
            requestUserId: owner.getId(),
        });

        expect(result.project).toEqual({
            id: project.getId(),
            ownerId: owner.getId(),
            status: project.getStatus(),
            title: project.getTitle(),
            color: project.getColor(),
            icon: project.getIcon(),
            revenue: project.getRevenue(),
            description: project.getDescription(),
            createdAt: project.getCreatedAt(),
            updatedAt: project.getUpdatedAt(),
        });

        expect(result.tasks).toEqual({
            total: 0,
            completed: 0,
            highPriority: 0,
            mediumPriority: 0,
            lowPriority: 0,
            productivity: {
                Sunday: 0,
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Saturday: 0,
            },
        });

        expect(result.costs).toEqual({
            totalValue: 0,
            totalProfit: project.getRevenue(),
        });
    });

    it('should handle tasks without completedAt gracefully', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const project = makeProject({ owner });

        const tasks = [
            makeTask({
                status: 'COMPLETED',
                priority: 'HIGH',
                // No completedAt date
            }),
            makeTask({
                status: 'COMPLETED',
                priority: 'MEDIUM',
                completedAt: new Date('2024-11-12T10:00:00Z'), // Tuesday
            }),
        ];
        tasks.forEach(task => project.addTask(task));

        await projectRepository.create(project);

        const result = await getProjectDashboardUseCase.execute({
            projectId: project.getId(),
            requestUserId: owner.getId(),
        });

        expect(result.tasks.productivity).toEqual({
            Sunday: 0,
            Monday: 0,
            Tuesday: 1,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0,
        });
    });
});
