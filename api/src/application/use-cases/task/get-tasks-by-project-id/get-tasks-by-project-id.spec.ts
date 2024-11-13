import { TaskRepository } from "@domain/repositories/task.repository";
import { GetTasksByProjectIdUseCase } from "./get-tasks-by-project-id.usecase";
import { InMemoryTaskRepository } from "@test/repositories/in-memory-task.repository";
import { makeTask } from "@test/factories/task.factory";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";
import { makeUser } from "@test/factories/user.factory";
import { UserRepository } from "@domain/repositories/user.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";

describe('GetTasksByProjectIdUseCase', () => {

    let getTasksByProjectIdUseCase: GetTasksByProjectIdUseCase;
    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let findUserByIdUseCase: FindUserByIdUseCase;

    let taskRepository: TaskRepository;
    let projectRepository: ProjectRepository;
    let userRepository: UserRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        taskRepository = new InMemoryTaskRepository();
        userRepository = new InMemoryUserRepository();

        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository, findUserByIdUseCase);
        getTasksByProjectIdUseCase = new GetTasksByProjectIdUseCase(taskRepository, findProjectByIdUseCase);
    });

    it('should return tasks for a project owned by the user', async () => {
        const user = makeUser({ role: 'FREE' });
        await userRepository.create(user);

        const project = makeProject({ owner: user });
        await projectRepository.create(project);

        const task1 = makeTask({ projectId: project.getId() });
        const task2 = makeTask({ projectId: project.getId() });
        await taskRepository.create(task1);
        await taskRepository.create(task2);

        const tasks = await getTasksByProjectIdUseCase.execute({
            requestUserId: user.getId(),
            projectId: project.getId()
        });

        expect(tasks.length).toBe(2);
        expect(tasks[0].getProjectId()).toBe(project.getId());
        expect(tasks[1].getProjectId()).toBe(project.getId());
    });

    it('should throw UnauthorizedUserError if the user tries to access tasks of a project they do not own', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const otherUser = makeUser();
        await userRepository.create(otherUser);

        const project = makeProject({ owner: owner });
        await projectRepository.create(project);

        await expect(getTasksByProjectIdUseCase.execute({
            requestUserId: otherUser.getId(),
            projectId: project.getId()
        })).rejects.toThrow(UnauthorizedUserError);
    });

    it('should return tasks for any project when the user is an admin', async () => {
        const freeUser = makeUser({ role: 'FREE' });
        const adminUser = makeUser({ role: 'ADMIN' });

        await Promise.all([
            userRepository.create(adminUser),
            userRepository.create(freeUser)
        ])

        const otherUserProject = makeProject({ owner: makeUser() });
        await projectRepository.create(otherUserProject);

        const task1 = makeTask({ projectId: otherUserProject.getId() });
        const task2 = makeTask({ projectId: otherUserProject.getId() });

        await Promise.all([
            await taskRepository.create(task1),
            await taskRepository.create(task2)
        ])

        const tasks = await getTasksByProjectIdUseCase.execute({
            requestUserId: adminUser.getId(),
            projectId: otherUserProject.getId()
        });

        expect(tasks.length).toBe(2);
        expect(tasks[0].getProjectId()).toBe(otherUserProject.getId());
        expect(tasks[1].getProjectId()).toBe(otherUserProject.getId());
    });

    it('should return an empty array if there are no tasks for the given project', async () => {
        const user = makeUser({ role: 'FREE' });
        await userRepository.create(user);

        const project = makeProject({ owner: user });
        await projectRepository.create(project);

        const tasks = await getTasksByProjectIdUseCase.execute({
            requestUserId: user.getId(),
            projectId: project.getId()
        });

        expect(tasks.length).toBe(0);
    });

});