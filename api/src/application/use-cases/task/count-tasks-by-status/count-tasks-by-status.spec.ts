import { TaskRepository } from '@domain/repositories/task.repository';
import { CountTasksByStatusUseCase } from './count-tasks-by-status.usecase';

describe('CountTasksByStatusUseCase', () => {
  let taskRepository: TaskRepository;
  let countTasksByStatusUseCase: CountTasksByStatusUseCase;

  beforeEach(() => {
    taskRepository = {
      countByStatus: jest.fn(),
    } as unknown as TaskRepository;
    countTasksByStatusUseCase = new CountTasksByStatusUseCase(taskRepository);
  });

  it('should return the number of tasks with the given status', async () => {
    const status = 'PENDING';
    const taskCount = 8;
    (taskRepository.countByStatus as jest.Mock).mockResolvedValue(taskCount);

    const result = await countTasksByStatusUseCase.execute(status);

    expect(taskRepository.countByStatus).toHaveBeenCalledWith(status);
    expect(result).toBe(taskCount);
  });

});