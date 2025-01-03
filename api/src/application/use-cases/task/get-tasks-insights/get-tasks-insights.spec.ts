import { GetTasksInsightsUseCase } from './get-tasks-insights.usecase';
import { CountTasksUseCase } from '../count-tasks/count-tasks.usecase';
import { CountTasksByPriorityUseCase } from '../count-tasks-by-priority/count-tasks-by-priority.usecase';
import { CountTasksByStatusUseCase } from '../count-tasks-by-status/count-tasks-by-status.usecase';
import { GetTasksGrowthUseCase } from '../get-tasks-growth/get-tasks-growth.usecase';

describe('GetTasksInsightsUseCase', () => {
  let getTasksInsightsUseCase: GetTasksInsightsUseCase;
  let countTasksUseCase: CountTasksUseCase;
  let countTasksByPriorityUseCase: CountTasksByPriorityUseCase;
  let countTasksByStatusUseCase: CountTasksByStatusUseCase;
  let getTasksGrowthUseCase: GetTasksGrowthUseCase;

  beforeEach(() => {
    countTasksUseCase = { execute: jest.fn() } as unknown as CountTasksUseCase;
    countTasksByPriorityUseCase = { execute: jest.fn() } as unknown as CountTasksByPriorityUseCase;
    countTasksByStatusUseCase = { execute: jest.fn() } as unknown as CountTasksByStatusUseCase;
    getTasksGrowthUseCase = { execute: jest.fn() } as unknown as GetTasksGrowthUseCase;

    getTasksInsightsUseCase = new GetTasksInsightsUseCase(
      countTasksUseCase,
      countTasksByPriorityUseCase,
      countTasksByStatusUseCase,
      getTasksGrowthUseCase
    );
  });

  it('should return the correct task insights', async () => {
    const mockTasksCount = 20;
    const mockHighPriorityCount = 5;
    const mockMediumPriorityCount = 8;
    const mockLowPriorityCount = 7;
    const mockPendingTasksCount = 10;
    const mockCompletedTasksCount = 10;
    const mockMonthlyGrowth = 2;

    (countTasksUseCase.execute as jest.Mock).mockResolvedValue(mockTasksCount);
    (countTasksByPriorityUseCase.execute as jest.Mock).mockImplementation((priority) => {
      if (priority === 'HIGH') return Promise.resolve(mockHighPriorityCount);
      if (priority === 'MEDIUM') return Promise.resolve(mockMediumPriorityCount);
      if (priority === 'LOW') return Promise.resolve(mockLowPriorityCount);
      return Promise.reject(new Error('Invalid priority'));
    });
    (countTasksByStatusUseCase.execute as jest.Mock).mockImplementation((status) => {
      if (status === 'PENDING') return Promise.resolve(mockPendingTasksCount);
      if (status === 'COMPLETED') return Promise.resolve(mockCompletedTasksCount);
      return Promise.reject(new Error('Invalid status'));
    });
    (getTasksGrowthUseCase.execute as jest.Mock).mockResolvedValue(mockMonthlyGrowth);

    const result = await getTasksInsightsUseCase.execute();

    expect(countTasksUseCase.execute).toHaveBeenCalled();
    expect(countTasksByPriorityUseCase.execute).toHaveBeenCalledWith('HIGH');
    expect(countTasksByPriorityUseCase.execute).toHaveBeenCalledWith('MEDIUM');
    expect(countTasksByPriorityUseCase.execute).toHaveBeenCalledWith('LOW');
    expect(countTasksByStatusUseCase.execute).toHaveBeenCalledWith('PENDING');
    expect(countTasksByStatusUseCase.execute).toHaveBeenCalledWith('COMPLETED');
    expect(getTasksGrowthUseCase.execute).toHaveBeenCalledWith('MONTHLY');

    expect(result).toEqual({
      total: mockTasksCount,
      highPriority: mockHighPriorityCount,
      mediumPriority: mockMediumPriorityCount,
      lowPriority: mockLowPriorityCount,
      pending: mockPendingTasksCount,
      completed: mockCompletedTasksCount,
      monthlyGrowth: mockMonthlyGrowth,
    });
  });

  it('should handle errors in counting tasks', async () => {
    const errorMessage = 'Error fetching total tasks';
    (countTasksUseCase.execute as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getTasksInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in counting tasks by priority', async () => {
    const errorMessage = 'Error fetching high priority tasks';
    (countTasksByPriorityUseCase.execute as jest.Mock).mockImplementation((priority) => {
      if (priority === 'HIGH') return Promise.reject(new Error(errorMessage));
      return Promise.resolve(0);
    });

    await expect(getTasksInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in counting tasks by status', async () => {
    const errorMessage = 'Error fetching completed tasks';
    (countTasksByStatusUseCase.execute as jest.Mock).mockImplementation((status) => {
      if (status === 'COMPLETED') return Promise.reject(new Error(errorMessage));
      return Promise.resolve(0);
    });

    await expect(getTasksInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in fetching monthly growth', async () => {
    const errorMessage = 'Error fetching tasks monthly growth';
    (getTasksGrowthUseCase.execute as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getTasksInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

});