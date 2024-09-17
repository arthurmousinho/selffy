import { InMemoryTaskRepository } from "@test/repositories/in-memory-task.repository";
import { FindAllTasksUseCase } from "./find-all-tasks.usecase";
import { TaskRepository } from "@application/repositories/task.repository";
import { makeTask } from "@test/factories/task.factory";

describe('Find All Tasks UseCase', () => {
    
    let findAllTasksUseCase: FindAllTasksUseCase;
    let taskRepository: TaskRepository;

    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository();
        findAllTasksUseCase = new FindAllTasksUseCase(taskRepository);
    });

    it('should return an empty list if no tasks exist', async () => {
        const tasks = await findAllTasksUseCase.execute();

        expect(tasks).toEqual([]);
    });

    it('should return all tasks if they exist', async () => {
        const task1 = makeTask({ title: 'Task 1', description: 'First task' });
        const task2 = makeTask({ title: 'Task 2', description: 'Second task' });

        await taskRepository.create(task1);
        await taskRepository.create(task2);

        const tasks = await findAllTasksUseCase.execute();

        expect(tasks.length).toBe(2);
        expect(tasks).toContainEqual(task1);
        expect(tasks).toContainEqual(task2);
    });

});