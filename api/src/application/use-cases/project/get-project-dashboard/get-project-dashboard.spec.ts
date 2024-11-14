import { GetProjectDashboardUseCase } from "./get-project-dashboard.usecase";
import { FindProjectByIdUseCase } from "../find-project-by-id/find-project-by-id.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";
import { makeTask } from "@test/factories/task.factory";
import { makeCost } from "@test/factories/cost.factory";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { makeUser } from "@test/factories/user.factory";

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
        const costs = [
            makeCost({ value: 100 }),
            makeCost({ value: 200 })
        ];

        costs.map(cost => project.addCosts(cost));
        tasks.map(task => project.addTask(task));

        await projectRepository.create(project);

        const result = await getProjectDashboardUseCase.execute({
            projectId: project.getId(),
            requestUserId: owner.getId()
        });

        expect(result.title).toBe(project.getTitle());
        expect(result.color).toBe(project.getColor());
        expect(result.icon).toBe(project.getIcon());
        expect(result.revenue).toBe(project.getRevenue());
        expect(result.tasks.total).toBe(3);
        expect(result.tasks.completed).toBe(2);  
        expect(result.tasks.highPriority).toBe(1);
        expect(result.tasks.mediumPriority).toBe(1);
        expect(result.tasks.lowPriority).toBe(1);
        expect(result.costs.totalValue).toBe(300);
    });

    it('should throw UnauthorizedUserError if the user does not have permission', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const requestUser = makeUser();
        await userRepository.create(requestUser);

        const project = makeProject({ owner });
        await projectRepository.create(project);

        const unauthorizedUserId = requestUser.getId();

        await expect(getProjectDashboardUseCase.execute({
            projectId: project.getId(),
            requestUserId: unauthorizedUserId
        })).rejects.toThrow(UnauthorizedUserError);
    });

});