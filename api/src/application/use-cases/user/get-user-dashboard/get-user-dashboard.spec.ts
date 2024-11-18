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
            makeProject({ owner: user, title: "Project A", status: 'IN_PROGRESS', revenue: 1000 }),
            makeProject({ owner: user, title: "Project B", status: 'FINISHED', revenue: 500 }),
            makeProject({ owner: user, title: "Project C", status: 'IN_PROGRESS', revenue: 200 }),
        ];

        const tasks = [
            makeTask({ status: 'COMPLETED', completedAt: new Date('2024-11-13T10:00:00Z') }),
            makeTask({ status: 'COMPLETED', completedAt: new Date('2024-11-14T12:00:00Z') }),
            makeTask({ status: 'PENDING' }),
        ];

        projects[0].addTask(tasks[0]);
        projects[1].addTask(tasks[1]);
        projects[2].addTask(tasks[2]);

        user.addProject(projects[0]);
        user.addProject(projects[1]);
        user.addProject(projects[2]);

        await userRepository.create(user);

        const result = await getUserDashboardUseCase.execute({
            requestUserId: user.getId(),
            ownerId: user.getId(),
        });

        expect(result).toEqual({
            completedTasks: 2,
            activeProjects: 2,
            totalRevenue: 1700,
            projectRanking: [
                { title: "Project A", completedTasks: 1, pendingTasks: 0 },
                { title: "Project B", completedTasks: 1, pendingTasks: 0 },
                { title: "Project C", completedTasks: 0, pendingTasks: 1 },
            ],
            weekProductivity: {
                Sunday: 0,
                Monday: 0,
                Tuesday: 0,
                Wednesday: 1,
                Thursday: 1,
                Friday: 0,
                Saturday: 0,
            },
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
        const projects = [
            makeProject({ owner: user, title: "Project A", status: 'IN_PROGRESS', revenue: 500 }),
            makeProject({ owner: user, title: "Project B", status: 'FINISHED', revenue: 300 }),
        ];

        user.addProject(projects[0]);
        user.addProject(projects[1]);

        await userRepository.create(user);

        const result = await getUserDashboardUseCase.execute({
            requestUserId: user.getId(),
            ownerId: user.getId(),
        });

        expect(result).toEqual({
            completedTasks: 0,
            activeProjects: 1,
            totalRevenue: 800,
            projectRanking: [
                { title: "Project A", completedTasks: 0, pendingTasks: 0 },
                { title: "Project B", completedTasks: 0, pendingTasks: 0 },
            ],
            weekProductivity: {
                Sunday: 0,
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Saturday: 0,
            },
        });
    });

});