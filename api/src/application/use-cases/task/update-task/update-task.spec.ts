import { TaskRepository } from "@domain/repositories/task.repository";
import { UpdateTaskUseCase } from "./update-task.usecase";
import { InMemoryTaskRepository } from "@test/repositories/in-memory-task.repository";
import { makeTask } from "@test/factories/task.factory";
import { TaskNotFoundError } from "@application/errors/task/task-not-found.error";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";
import { ProjectAlreadyFinishedError } from "@application/errors/project/project-already-finished.error";
import { TaskDueDateInPastError } from "@application/errors/task/task-due-date-in-past.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { UserRepository } from "@domain/repositories/user.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { makeUser } from "@test/factories/user.factory";

describe('UpdateTaskUseCase', () => {

    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let updateTaskUseCase: UpdateTaskUseCase;
    let findUserByIdUseCase: FindUserByIdUseCase;
    
    let taskRepository: TaskRepository;
    let projectRepository: ProjectRepository;
    let userRepository: UserRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        userRepository = new InMemoryUserRepository();
        taskRepository = new InMemoryTaskRepository();

        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository, findUserByIdUseCase);
        updateTaskUseCase = new UpdateTaskUseCase(taskRepository, findProjectByIdUseCase, findUserByIdUseCase);
    });

    it('should throw TaskNotFoundError if the task does not exist', async () => {
        const nonExistentTask = makeTask();

        await expect(updateTaskUseCase.execute({
            requestUserId: 'user-1',
            id: nonExistentTask.getId(),
            title: 'New Task Title',
            description: 'New Task Description',
            status: nonExistentTask.getStatus(),
            dueDate: nonExistentTask.getDueDate(),
            priority: nonExistentTask.getPriority(),
            projectId: nonExistentTask.getProjectId()
        })).rejects.toThrow(TaskNotFoundError);
    });

    it('should throw ProjectAlreadyFinishedError if the project is finished', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const finishedProject = makeProject({ status: 'FINISHED', owner });
        await projectRepository.create(finishedProject);

        const existingTask = makeTask({ projectId: finishedProject.getId() });
        await taskRepository.create(existingTask);

        await expect(updateTaskUseCase.execute({
            requestUserId: finishedProject.getOwner().getId(),
            id: existingTask.getId(),
            title: 'Updated Task Title',
            description: 'Updated Task Description',
            status: existingTask.getStatus(),
            dueDate: existingTask.getDueDate(),
            priority: existingTask.getPriority(),
            projectId: finishedProject.getId()
        })).rejects.toThrow(ProjectAlreadyFinishedError);
    });

    it('should throw TaskDueDateInPastError if due date is in the past', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const project = makeProject({ status: 'IN_PROGRESS', owner });
        await projectRepository.create(project);

        const existingTask = makeTask({ projectId: project.getId() });
        await taskRepository.create(existingTask);

        const pastDueDate = new Date();
        pastDueDate.setDate(pastDueDate.getDate() - 1);

        await expect(updateTaskUseCase.execute({
            requestUserId: project.getOwner().getId(),
            id: existingTask.getId(),
            title: 'Updated Task Title',
            description: 'Updated Task Description',
            status: existingTask.getStatus(),
            dueDate: pastDueDate,
            priority: existingTask.getPriority(),
            projectId: project.getId()
        })).rejects.toThrow(TaskDueDateInPastError);
    });

    it('should throw UnauthorizedUserError if user is not admin and tries to update a task for a project they do not own', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const nonOwnerUser = makeUser();
        await userRepository.create(nonOwnerUser);

        const project = makeProject({ status: 'IN_PROGRESS', owner });
        await projectRepository.create(project);

        const existingTask = makeTask({ projectId: project.getId() });
        await taskRepository.create(existingTask);

        await expect(updateTaskUseCase.execute({
            requestUserId: nonOwnerUser.getId(),
            id: existingTask.getId(),
            title: 'Updated Task Title',
            description: 'Updated Task Description',
            status: existingTask.getStatus(),
            dueDate: existingTask.getDueDate(),
            priority: existingTask.getPriority(),
            projectId: project.getId()
        })).rejects.toThrow(UnauthorizedUserError);
    });

    it('should update a task for a project that the user owns', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const project = makeProject({ status: 'IN_PROGRESS', owner });
        await projectRepository.create(project);

        const existingTask = makeTask({
            projectId: project.getId(),
            title: 'Old Task Title',
            description: 'Old Task Description'
        });
        await taskRepository.create(existingTask);

        const newTitle = 'Updated Task Title';
        const newDescription = 'Updated Task Description';

        await updateTaskUseCase.execute({
            requestUserId: owner.getId(),
            id: existingTask.getId(),
            title: newTitle,
            description: newDescription,
            status: existingTask.getStatus(),
            dueDate: existingTask.getDueDate(),
            priority: existingTask.getPriority(),
            projectId: project.getId()
        });

        const updatedTask = await taskRepository.findById(existingTask.getId());

        expect(updatedTask).not.toBeNull();
        if (updatedTask) {
            expect(updatedTask.getTitle()).toBe(newTitle);
            expect(updatedTask.getDescription()).toBe(newDescription);
            expect(updatedTask.getStatus()).toBe(existingTask.getStatus());
            expect(updatedTask.getDueDate()).toEqual(existingTask.getDueDate());
            expect(updatedTask.getPriority()).toBe(existingTask.getPriority());
        }
    });

    it('should allow an admin user to update a task for any project', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const adminUser = makeUser({ role: 'ADMIN' });
        await userRepository.create(adminUser);

        const project = makeProject({ status: 'IN_PROGRESS', owner });
        await projectRepository.create(project);

        const existingTask = makeTask({
            projectId: project.getId(),
            title: 'Old Task Title',
            description: 'Old Task Description'
        });
        await taskRepository.create(existingTask);

        const newTitle = 'Updated Task Title';
        const newDescription = 'Updated Task Description';

        await updateTaskUseCase.execute({
            requestUserId: adminUser.getId(),
            id: existingTask.getId(),
            title: newTitle,
            description: newDescription,
            status: existingTask.getStatus(),
            dueDate: existingTask.getDueDate(),
            priority: existingTask.getPriority(),
            projectId: project.getId(),
        });

        const updatedTask = await taskRepository.findById(existingTask.getId());

        expect(updatedTask).not.toBeNull();
        if (updatedTask) {
            expect(updatedTask.getTitle()).toBe(newTitle);
            expect(updatedTask.getDescription()).toBe(newDescription);
            expect(updatedTask.getStatus()).toBe(existingTask.getStatus());
            expect(updatedTask.getDueDate()).toEqual(existingTask.getDueDate());
            expect(updatedTask.getPriority()).toBe(existingTask.getPriority());
        }
    });

});