import { GetUserDashboardUseCase } from "./get-user-dashboard.usecase";
import { FindUserByIdUseCase } from "../find-user-by-id/find-user-by-id.usecase";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { makeUser } from "@test/factories/user.factory";
import { makeProject } from "@test/factories/project.factory";
import { makeTask } from "@test/factories/task.factory";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";

describe('GetUserDashboardUseCase', () => {
    let getUserDashboardUseCase: GetUserDashboardUseCase;
    let findUserByIdUseCase: FindUserByIdUseCase;

    let userRepository: InMemoryUserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        getUserDashboardUseCase = new GetUserDashboardUseCase(findUserByIdUseCase);
    });

    it('should return correct dashboard data for a user with projects and tasks', async () => {
        const user = makeUser();
        const projects = [
            makeProject({ owner: user, status: 'IN_PROGRESS', revenue: 1000 }),
            makeProject({ owner: user, status: 'FINISHED', revenue: 500 }),
        ];

        const tasks = [
            makeTask({ status: 'COMPLETED' }),
            makeTask({ status: 'PENDING' }),
            makeTask({ status: 'COMPLETED' }),
        ];

        projects[0].addTask(tasks[0]);
        projects[0].addTask(tasks[1]);
        projects[1].addTask(tasks[2]);

        user.addProject(projects[0]);
        user.addProject(projects[1]);

        await userRepository.create(user);

        const result = await getUserDashboardUseCase.execute({
            requestUserId: user.getId(),
            ownerId: user.getId(),
        });

        expect(result).toEqual({
            completedTasks: 2,
            activeProjects: 1,
            totalRevenue: 1500,
        });
    });

    it('should return zero values if the user has no projects', async () => {
        const user = makeUser();
        await userRepository.create(user);

        const result = await getUserDashboardUseCase.execute({
            requestUserId: user.getId(),
            ownerId: user.getId(),
        });

        expect(result).toEqual({
            completedTasks: 0,
            activeProjects: 0,
            totalRevenue: 0,
        });
    });

    it('should throw UserNotFoundError if the user does not exist', async () => {
        await expect(
            getUserDashboardUseCase.execute({
                requestUserId: 'non-existent-user-id',
                ownerId: 'non-existent-user-id',
            }),
        ).rejects.toThrow(UserNotFoundError);
    });

    it('should correctly handle a user with projects but no tasks', async () => {
        const user = makeUser();
        const project = makeProject({ owner: user, status: 'IN_PROGRESS', revenue: 200 });

        user.addProject(project);
        await userRepository.create(user);

        const result = await getUserDashboardUseCase.execute({
            requestUserId: user.getId(),
            ownerId: user.getId(),
        });

        expect(result).toEqual({
            completedTasks: 0,
            activeProjects: 1,
            totalRevenue: 200,
        });
    });

});