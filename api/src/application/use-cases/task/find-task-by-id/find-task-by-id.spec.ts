import { TaskRepository } from "@application/repositories/task.repository";
import { FindTaskByIdUseCase } from "./find-task-by-id.usecase";
import { InMemoryTaskRepository } from "@test/repositories/in-memory-task.repository";
import { TaskNotFoundError } from "@application/errors/task/task-not-found.error";
import { makeTask } from "@test/factories/task.factory";

describe('FindTaskById UseCase', () => {
    
    let findTaskByIdUseCase: FindTaskByIdUseCase;
    let taskRepository: TaskRepository;

    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository();
        findTaskByIdUseCase = new FindTaskByIdUseCase(taskRepository);
    });

    it('should throw an error if the task does not exist', async () => {
        await expect(findTaskByIdUseCase.execute('non-existing-id')).rejects.toThrow(TaskNotFoundError);
    });

    it('should return the task if it exists', async () => {
        const task = makeTask();
        await taskRepository.create(task);

        const foundTask = await findTaskByIdUseCase.execute(task.getId());

        expect(foundTask).toBeDefined();
        expect(foundTask.getId()).toBe(task.getId());
        expect(foundTask.getTitle()).toBe(task.getTitle());
    });

});