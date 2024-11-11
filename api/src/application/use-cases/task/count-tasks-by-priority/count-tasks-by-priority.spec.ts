import { TaskRepository } from '@domain/repositories/task.repository';
import { CountTasksByPriorityUseCase } from './count-tasks-by-priority.usecase';

describe('CountTasksByPriorityUseCase', () => {
  let taskRepository: TaskRepository;
  let countTasksByPriorityUseCase: CountTasksByPriorityUseCase;

  beforeEach(() => {
    taskRepository = {
      countByPriority: jest.fn(),
    } as unknown as TaskRepository;
    countTasksByPriorityUseCase = new CountTasksByPriorityUseCase(taskRepository);
  });

  it('should return the number of tasks with the given priority', async () => {
    const priority = 'HIGH';
    const taskCount = 5;
    (taskRepository.countByPriority as jest.Mock).mockResolvedValue(taskCount);

    const result = await countTasksByPriorityUseCase.execute(priority);

    expect(taskRepository.countByPriority).toHaveBeenCalledWith(priority);
    expect(result).toBe(taskCount);
  });

  it('should handle errors thrown by the taskRepository', async () => {
    const priority = 'LOW';
    const errorMessage = 'Error counting tasks by priority';
    (taskRepository.countByPriority as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(countTasksByPriorityUseCase.execute(priority)).rejects.toThrow(errorMessage);
  });

});