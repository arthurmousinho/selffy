import { FindUserByIdUseCase } from "../find-user-by-id/find-user-by-id.usecase";
import { UserRepository } from "@domain/repositories/user.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { makeUser } from "@test/factories/user.factory";
import { makeProject } from "@test/factories/project.factory";
import { makeTask } from "@test/factories/task.factory";
import { GetUserDashboardUseCase } from "./get-user-dashboard.usecase";
import { makeCost } from "@test/factories/cost.factory";

describe("GetUserDashboardUseCase", () => {

    let getUserDashboardUseCase: GetUserDashboardUseCase;
    let findUserByIdUseCase: FindUserByIdUseCase;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        getUserDashboardUseCase = new GetUserDashboardUseCase(findUserByIdUseCase);
    });

    it("should return an empty dashboard when the user has no projects", async () => {
        const user = makeUser();
        await userRepository.create(user);

        const dashboard = await getUserDashboardUseCase.execute({
            requestUserId: user.getId(),
            ownerId: user.getId(),
        });

        expect(dashboard).toEqual({
            completedTasks: 0,
            activeProjects: 0,
            totalRevenue: 0,
            projectRanking: [],
            completedTasksMonthlyGrowth: 0,
            activeProjectsMonthlyGrowth: 0,
        });
    });

    it("should calculate dashboard metrics correctly when the user has projects", async () => {
        const user = makeUser();
        await userRepository.create(user);

        const project1 = makeProject({ owner: user, status: "IN_PROGRESS", revenue: 1000 });
        const project2 = makeProject({ owner: user, status: "IN_PROGRESS", revenue: 2000 });

        const task1 = makeTask({ projectId: project1.getId(), status: "COMPLETED", completedAt: new Date() });
        const task2 = makeTask({ projectId: project1.getId(), status: "PENDING" });
        const task3 = makeTask({ projectId: project2.getId(), status: "COMPLETED", completedAt: new Date() });

        project1.addTask(task1)
        project1.addTask(task2);
        project2.addTask(task3);

        user.addProject(project1);
        user.addProject(project2);

        await userRepository.create(user);

        const dashboard = await getUserDashboardUseCase.execute({
            requestUserId: user.getId(),
            ownerId: user.getId(),
        });

        expect(dashboard.completedTasks).toBe(2);
        expect(dashboard.activeProjects).toBe(2);
        expect(dashboard.totalRevenue).toBe(3000);
        expect(dashboard.projectRanking).toHaveLength(2);
        expect(dashboard.projectRanking[0].title).toBe(project1.getTitle());
        expect(dashboard.projectRanking[0].completedTasks).toBe(1);
        expect(dashboard.projectRanking[1].title).toBe(project2.getTitle());
        expect(dashboard.projectRanking[1].completedTasks).toBe(1);
        expect(dashboard.completedTasksMonthlyGrowth).toBeGreaterThan(0);
        expect(dashboard.activeProjectsMonthlyGrowth).toBeGreaterThan(0);
    });

    it("should handle monthly growth calculation correctly", async () => {
        const user = makeUser();
        await userRepository.create(user);

        const project = makeProject({ owner: user, status: "IN_PROGRESS" });

        const taskLastMonth = makeTask({
            projectId: project.getId(),
            status: "COMPLETED",
            completedAt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        });

        const taskThisMonth = makeTask({
            projectId: project.getId(),
            status: "COMPLETED",
            completedAt: new Date(),
        });

        project.addTask(taskLastMonth);
        project.addTask(taskThisMonth);

        user.addProject(project);

        await userRepository.create(user);

        const dashboard = await getUserDashboardUseCase.execute({
            requestUserId: user.getId(),
            ownerId: user.getId(),
        });

        expect(dashboard.completedTasksMonthlyGrowth).toBe(0);
        expect(dashboard.activeProjectsMonthlyGrowth).toBe(1); 
    });

    it("should return week productivity correctly", async () => {
        const user = makeUser();
        await userRepository.create(user);

        const project = makeProject({ owner: user });

        const taskMonday = makeTask({
            projectId: project.getId(),
            status: "COMPLETED",
            completedAt: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)), // Monday
        });

        const taskWednesday = makeTask({
            projectId: project.getId(),
            status: "COMPLETED",
            completedAt: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 3)), // Wednesday
        });

        project.addTask(taskMonday);
        project.addTask(taskWednesday);

        user.addProject(project);

        await userRepository.create(user);

        const dashboard = await getUserDashboardUseCase.execute({
            requestUserId: user.getId(),
            ownerId: user.getId(),
        });

        if (dashboard.weekProductivity === undefined) {
            throw new Error("Week productivity is undefined");
        }

        expect(dashboard.weekProductivity["Monday"]).toBe(1);
        expect(dashboard.weekProductivity["Wednesday"]).toBe(1);
        expect(dashboard.weekProductivity["Sunday"]).toBe(0); // No tasks completed on Sunday
    });

    it("should calculate total profit correctly", async () => {
        const user = makeUser();
        await userRepository.create(user);
    
        const cost1 = makeCost({ value: 200 });
        const cost2 = makeCost({ value: 300 });

        const cost3 = makeCost({ value: 500 });
        const cost4 = makeCost({ value: 400 });

        const project1 = makeProject({
            owner: user,
            status: "IN_PROGRESS",
            revenue: 1000,
            costs: [ cost1, cost2 ],
        });
        const project2 = makeProject({
            owner: user,
            status: "IN_PROGRESS",
            revenue: 2000,
            costs: [ cost3, cost4 ]
        });
    
        const task1 = makeTask({ projectId: project1.getId(), status: "COMPLETED", completedAt: new Date() });
        const task2 = makeTask({ projectId: project2.getId(), status: "COMPLETED", completedAt: new Date() });
    
        project1.addTask(task1);
        project2.addTask(task2);
    
        user.addProject(project1);
        user.addProject(project2);
    
        await userRepository.create(user);
    
        const dashboard = await getUserDashboardUseCase.execute({
            requestUserId: user.getId(),
            ownerId: user.getId(),
        });

        expect(dashboard.totalProfit).toBe(1600);
    });
    
});