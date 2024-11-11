import { TaskRepository } from '@domain/repositories/task.repository';
import { CountTasksUseCase } from './count-tasks.usecase';

describe('CountTasksUseCase', () => {
    
  let taskRepository: TaskRepository;
  let countTasksUseCase: CountTasksUseCase;

  beforeEach(() => {
    taskRepository = {
      count: jest.fn(),
    } as unknown as TaskRepository;
    countTasksUseCase = new CountTasksUseCase(taskRepository);
  });

  it('should return the total number of tasks', async () => {
    const taskCount = 15;
    (taskRepository.count as jest.Mock).mockResolvedValue(taskCount);

    const result = await countTasksUseCase.execute();

    expect(taskRepository.count).toHaveBeenCalled();
    expect(result).toBe(taskCount);
  });

});