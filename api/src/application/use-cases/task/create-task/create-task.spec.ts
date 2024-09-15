import { TaskRepository } from "@application/repositories/task.repository";
import { CreateTaskUseCase } from "./create-task.usecase";
import { InMemoryTaskRepository } from "@test/repositories/in-memory-task.repository";
import { makeTask } from "@test/factories/task.factory";
import { TaskAlreadyExistsError } from "@application/errors/task/task-already-exists.error";

describe('Create Task UseCase', () => {
    let createTaskUseCase: CreateTaskUseCase;
    let taskRepository: TaskRepository;

    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository();
        createTaskUseCase = new CreateTaskUseCase(taskRepository);
    });

    it('should throw an error if the task already exists', async () => {
        const newTask = makeTask();
        await createTaskUseCase.execute(newTask);
        await expect(createTaskUseCase.execute(newTask)).rejects.toThrow(TaskAlreadyExistsError);
    });

    it('should create a new task if the task does not exist', async () => {
        const newTask = makeTask();
        await createTaskUseCase.execute(newTask);
        const tasks = await taskRepository.findAll();
        expect(tasks.length).toBe(1);
        expect(tasks[0].getId()).toBe(newTask.getId());
        expect(tasks[0].getTitle()).toBe(newTask.getTitle());
        expect(tasks[0].getDescription()).toBe(newTask.getDescription());
        expect(tasks[0].getDueDate()).toEqual(newTask.getDueDate());
        expect(tasks[0].getPriority()).toBe(newTask.getPriority());
    });

});
