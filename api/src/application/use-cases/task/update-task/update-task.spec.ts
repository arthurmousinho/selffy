import { TaskRepository } from "@application/repositories/task.repository";
import { UpdateTaskUseCase } from "./update-task.usecase";
import { InMemoryTaskRepository } from "@test/repositories/in-memory-task.repository";
import { makeTask } from "@test/factories/task.factory";
import { TaskNotFoundError } from "@application/errors/task/task-not-found.error";

describe('Update Task UseCase', () => {
    
    let updateTaskUseCase: UpdateTaskUseCase;
    let taskRepository: TaskRepository;

    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository();
        updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
    });

    it('should throw an error if the task does not exist', async () => {
        const nonExistentTask = makeTask();

        await expect(updateTaskUseCase.execute(nonExistentTask)).rejects.toThrow(TaskNotFoundError);
    });

    it('should update the task if the task exists', async () => {
        const existingTask = makeTask();  
        await taskRepository.create(existingTask);  

        existingTask.setTitle('Updated Task Title');
        existingTask.setDescription('Updated task description');

        await updateTaskUseCase.execute(existingTask);

        const updatedTask = await taskRepository.findById(existingTask.getId());

        expect(updatedTask).not.toBeNull();
        if (updatedTask) {
            expect(updatedTask.getTitle()).toBe('Updated Task Title');
            expect(updatedTask.getDescription()).toBe('Updated task description');
        }
    });

});