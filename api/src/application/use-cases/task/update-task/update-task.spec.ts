import { TaskRepository } from "@application/repositories/task.repository";
import { UpdateTaskUseCase } from "./update-task.usecase";
import { InMemoryTaskRepository } from "@test/repositories/in-memory-task.repository";
import { makeTask } from "@test/factories/task.factory";
import { TaskNotFoundError } from "@application/errors/task/task-not-found.error";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { ProjectRepository } from "@application/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";
import { CreateProjectUseCase } from "@application/use-cases/project/create-project/create-project.usecase";

describe('Update Task UseCase', () => {
    
    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let createProjectUseCase: CreateProjectUseCase;
    let projectRepository: ProjectRepository;

    let updateTaskUseCase: UpdateTaskUseCase;
    let taskRepository: TaskRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository);
        createProjectUseCase = new CreateProjectUseCase(projectRepository);

        taskRepository = new InMemoryTaskRepository();
        updateTaskUseCase = new UpdateTaskUseCase(taskRepository, findProjectByIdUseCase);
    });

    it('should throw an error if the task does not exist', async () => {
        const nonExistentTask = makeTask();

        await expect(updateTaskUseCase.execute({
            id: nonExistentTask.getId(),
            title: nonExistentTask.getTitle(),
            description: nonExistentTask.getDescription(),
            status: nonExistentTask.getStatus(),
            dueDate: nonExistentTask.getDueDate(),
            priority: nonExistentTask.getPriority(),
            projectId: nonExistentTask.getProjectId()
        })).rejects.toThrow(TaskNotFoundError);
    });

    it('should update the task if the task exists', async () => {
        const newProject = makeProject();
        const taskProject = await createProjectUseCase.execute({
            owner: newProject.getOwner(),
            title: newProject.getTitle(),
            description: newProject.getDescription(),
            color: newProject.getColor(),
            revenue:  newProject.getRevenue(),
            icon: newProject.getIcon(),
        });

        const existingTask = makeTask({ projectId: taskProject.getId() });  
        await taskRepository.create(existingTask);  

        await updateTaskUseCase.execute({
            id: existingTask.getId(),
            title: existingTask.getTitle(),
            description: existingTask.getDescription(),
            status: existingTask.getStatus(),
            dueDate: existingTask.getDueDate(),
            priority: existingTask.getPriority(),
            projectId: existingTask.getProjectId()
        });

        const updatedTask = await taskRepository.findById(existingTask.getId());

        expect(updatedTask).not.toBeNull();
        if (updatedTask) {
            expect(updatedTask.getTitle()).toBe(existingTask.getTitle());
            expect(updatedTask.getDescription()).toBe(existingTask.getDescription());
            expect(updatedTask.getStatus()).toBe(existingTask.getStatus());
            expect(updatedTask.getDueDate()).toEqual(existingTask.getDueDate());
            expect(updatedTask.getPriority()).toBe(existingTask.getPriority());
        }
    });

});