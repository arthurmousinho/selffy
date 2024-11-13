import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { makeProject } from "@test/factories/project.factory";
import { makeTask } from "@test/factories/task.factory";
import { makeUser } from "@test/factories/user.factory";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { InMemoryTaskRepository } from "@test/repositories/in-memory-task.repository";
import { CreateTaskUseCase } from "./create-task.usecase";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { TaskRepository } from "@domain/repositories/task.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { UserRepository } from "@domain/repositories/user.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";

describe('Create Task UseCase', () => {

    let taskRepository: TaskRepository;
    let projectRepository: ProjectRepository;
    let userRepository: UserRepository;

    let createTaskUseCase: CreateTaskUseCase;
    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let findUserByIdUseCase: FindUserByIdUseCase;

    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository();
        projectRepository = new InMemoryProjectRepository();
        userRepository = new InMemoryUserRepository();

        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository, findUserByIdUseCase);
        createTaskUseCase = new CreateTaskUseCase(taskRepository, findProjectByIdUseCase);
    });

    it('should throw an error if the project does not exist', async () => {
        const user = makeUser({ role: 'PREMIUM' });
        await userRepository.create(user);

        const newTask = createTaskUseCase.execute({
            requestUserId: user.getId(),
            title: "Task Title",
            description: "Task Description",
            dueDate: new Date(),
            priority: "HIGH",
            projectId: "someProjectId",
        })

        await expect(newTask).rejects.toThrowError(ProjectNotFoundError);
    });

    it('should throw an error if user is not admin and tries to create a task for a project they do not own', async () => {
        const activeProject = makeProject({ status: 'IN_PROGRESS' });
        await projectRepository.create(activeProject);

        const nonOwnerUser = makeUser({
            id: "nonOwnerUserId",
            role: "FREE",
        });

        await userRepository.create(nonOwnerUser);

        await expect(createTaskUseCase.execute({
            requestUserId: nonOwnerUser.getId(),
            title: "Task Title",
            description: "Task Description",
            dueDate: new Date(),
            priority: "MEDIUM",
            projectId: activeProject.getId(),
        })).rejects.toThrowError(new UnauthorizedUserError());
    });

    it('should create a task for a project that the user owns', async () => {
        const ownerUser = makeUser({
            id: "ownerUserId",
            role: "FREE",
        });

        await userRepository.create(ownerUser);

        const ownedProject = makeProject({
            status: 'IN_PROGRESS',
            owner: ownerUser,
        });

        await projectRepository.create(ownedProject);

        const newTask = makeTask({ projectId: ownedProject.getId(), title: "User Owned Task" });

        await createTaskUseCase.execute({
            requestUserId: ownerUser.getId(),
            title: newTask.getTitle(),
            description: newTask.getDescription(),
            dueDate: newTask.getDueDate(),
            priority: newTask.getPriority(),
            projectId: ownedProject.getId(),
        });

        const tasks = await taskRepository.findAll(1, 10);
        expect(tasks.data.length).toBe(1);
        expect(tasks.data[0].getTitle()).toBe(newTask.getTitle());
    });

    it('should allow an admin user to create a task for any project', async () => {
        const adminUser = makeUser({
            role: 'ADMIN',
            id: 'adminUserId',
        })

        await userRepository.create(adminUser);

        const otherUserProject = makeProject({
            status: 'IN_PROGRESS',
            owner: adminUser
        });

        await projectRepository.create(otherUserProject);

        const newTask = makeTask({
            projectId: otherUserProject.getId(),
            title: "Admin Task"
        });

        await createTaskUseCase.execute({
            requestUserId: adminUser.getId(),
            title: newTask.getTitle(),
            description: newTask.getDescription(),
            dueDate: newTask.getDueDate(),
            priority: newTask.getPriority(),
            projectId: otherUserProject.getId(),
        });

        const tasks = await taskRepository.findAll(1, 10);
        expect(tasks.data.length).toBe(1);
        expect(tasks.data[0].getTitle()).toBe(newTask.getTitle());
    });

});