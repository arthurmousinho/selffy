import { TaskRepository } from "@application/repositories/task.repository";
import { CreateTaskUseCase } from "./create-task.usecase";
import { InMemoryTaskRepository } from "@test/repositories/in-memory-task.repository";
import { makeTask } from "@test/factories/task.factory";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { ProjectRepository } from "@application/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";
import { ProjectAlreadyFinishedError } from "@application/errors/project/project-already-finished.error";

describe('Create Task UseCase', () => {
    
    let createTaskUseCase: CreateTaskUseCase;
    let taskRepository: TaskRepository;

    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository();
        projectRepository = new InMemoryProjectRepository();

        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository);
        createTaskUseCase = new CreateTaskUseCase(taskRepository, findProjectByIdUseCase);
    });

    it('should create a new task for an active project', async () => {
        const activeProject = makeProject({ status: 'IN_PROGRESS' });
        await projectRepository.create(activeProject);

        const newTask = makeTask({ projectId: activeProject.getId() });

        await createTaskUseCase.execute({
            title: newTask.getTitle(),
            description: newTask.getDescription(),
            dueDate: newTask.getDueDate(),
            priority: newTask.getPriority(),
            projectId: activeProject.getId(),
        });

        const tasks = await taskRepository.findAll();
        expect(tasks.length).toBe(1);
        expect(tasks[0].getTitle()).toBe(newTask.getTitle());
        expect(tasks[0].getDescription()).toBe(newTask.getDescription());
        expect(tasks[0].getDueDate()).toEqual(newTask.getDueDate());
        expect(tasks[0].getPriority()).toBe(newTask.getPriority());
        expect(tasks[0].getProjectId()).toBe(activeProject.getId());
    });

    it('should throw an error if the project is already finished', async () => {
        const finishedProject = makeProject({ status: 'FINISHED' });
        await projectRepository.create(finishedProject);

        const newTask = makeTask({ projectId: finishedProject.getId() });

        await expect(createTaskUseCase.execute({
            title: newTask.getTitle(),
            description: newTask.getDescription(),
            dueDate: newTask.getDueDate(),
            priority: newTask.getPriority(),
            projectId: finishedProject.getId(),
        })).rejects.toThrow(ProjectAlreadyFinishedError);

        const tasks = await taskRepository.findAll();
        expect(tasks.length).toBe(0);
    });

});
