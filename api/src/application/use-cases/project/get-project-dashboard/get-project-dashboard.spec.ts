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
            makeTask({ status: 'COMPLETED', priority: 'HIGH' }),
            makeTask({ status: 'COMPLETED', priority: 'MEDIUM' }),
            makeTask({ status: 'PENDING', priority: 'LOW' })
        ];
        tasks.forEach(task => project.addTask(task));

        const costs = [
            makeCost({ value: 100 }),
            makeCost({ value: 200 })
        ];
        costs.forEach(cost => project.addCosts(cost));

        await projectRepository.create(project);

        const result = await getProjectDashboardUseCase.execute({
            projectId: project.getId(),
            requestUserId: owner.getId()
        });

        expect(result.title).toBe(project.getTitle());
        expect(result.color).toBe(project.getColor());
        expect(result.icon).toBe(project.getIcon());
        expect(result.revenue).toBe(project.getRevenue());
        expect(result.description).toBe(project.getDescription());
        expect(result.tasks.total).toBe(3);
        expect(result.tasks.completed).toBe(2);
        expect(result.tasks.highPriority).toBe(1);
        expect(result.tasks.mediumPriority).toBe(1);
        expect(result.tasks.lowPriority).toBe(1);
        expect(result.costs.totalValue).toBe(300);
        expect(result.costs.totalProfit).toBe(project.getRevenue() - 300);
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
            requestUserId: unauthorizedUser.getId()
        })).rejects.toThrow(UnauthorizedUserError);
    });

    it('should throw an error if the project does not exist', async () => {
        const user = makeUser();
        await userRepository.create(user);

        await expect(getProjectDashboardUseCase.execute({
            projectId: 'non-existent-project-id',
            requestUserId: user.getId()
        })).rejects.toThrowError(ProjectNotFoundError);
    });

    it('should return correct data for a project with no tasks or costs', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const project = makeProject({ owner });
        await projectRepository.create(project);

        const result = await getProjectDashboardUseCase.execute({
            projectId: project.getId(),
            requestUserId: owner.getId()
        });

        expect(result.tasks.total).toBe(0);
        expect(result.tasks.completed).toBe(0);
        expect(result.tasks.highPriority).toBe(0);
        expect(result.tasks.mediumPriority).toBe(0);
        expect(result.tasks.lowPriority).toBe(0);
        expect(result.costs.totalValue).toBe(0);
        expect(result.costs.totalProfit).toBe(project.getRevenue());
    });

});