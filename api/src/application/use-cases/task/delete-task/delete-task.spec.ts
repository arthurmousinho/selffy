import { TaskNotFoundError } from "@application/errors/task/task-not-found.error";
import { makeTask } from "@test/factories/task.factory";
import { InMemoryTaskRepository } from "@test/repositories/in-memory-task.repository";
import { DeleteTaskUseCase } from "./delete-task.usecase";
import { TaskRepository } from "@application/repositories/task.repository";

describe('Delete Task UseCase', () => {

    let deleteTaskUseCase: DeleteTaskUseCase;
    let taskRepository: TaskRepository;

    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository();
        deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
    });

    it('should throw an error if the task does not exist', async () => {
        const nonExistentTask = makeTask(); 

        await expect(deleteTaskUseCase.execute(nonExistentTask)).rejects.toThrow(TaskNotFoundError);
    });

    it('should delete the task if the task exists', async () => {
        const existingTask = makeTask();  
        await taskRepository.create(existingTask);  

        await deleteTaskUseCase.execute(existingTask);

        const foundTask = await taskRepository.findById(existingTask.getId());
        
        expect(foundTask).toBeFalsy();
    });

});