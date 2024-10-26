import { TaskRepository } from "@application/repositories/task.repository";
import { GetTasksGrowthUseCase } from "./get-tasks-growth.usecase"; // Adjust the import path as necessary
import { subDays, subWeeks, subMonths } from 'date-fns';

describe('GetTasksGrowthUseCase', () => {
    let taskRepository: TaskRepository;
    let getTasksGrowthUseCase: GetTasksGrowthUseCase;

    beforeEach(() => {
        taskRepository = {
            countTasksCreatedAfter: jest.fn(),
        } as unknown as TaskRepository;
        getTasksGrowthUseCase = new GetTasksGrowthUseCase(taskRepository);
    });

    it('should return the number of tasks created in the last day', async () => {
        const dailyTaskCount = 10;
        const dateFrom = subDays(new Date(), 1);
        (taskRepository.countTasksCreatedAfter as jest.Mock).mockResolvedValue(dailyTaskCount);

        const result = await getTasksGrowthUseCase.execute('DAILY');

        expect(taskRepository.countTasksCreatedAfter).toHaveBeenCalledWith(dateFrom);
        expect(result).toBe(dailyTaskCount);
    });

    it('should return the number of tasks created in the last week', async () => {
        const weeklyTaskCount = 30;
        const dateFrom = subWeeks(new Date(), 1);
        (taskRepository.countTasksCreatedAfter as jest.Mock).mockResolvedValue(weeklyTaskCount);

        const result = await getTasksGrowthUseCase.execute('WEEKLY');

        expect(taskRepository.countTasksCreatedAfter).toHaveBeenCalledWith(dateFrom);
        expect(result).toBe(weeklyTaskCount);
    });

    it('should return the number of tasks created in the last month', async () => {
        const monthlyTaskCount = 120;
        const dateFrom = subMonths(new Date(), 1);
        (taskRepository.countTasksCreatedAfter as jest.Mock).mockResolvedValue(monthlyTaskCount);

        const result = await getTasksGrowthUseCase.execute('MONTHLY');

        expect(taskRepository.countTasksCreatedAfter).toHaveBeenCalledWith(dateFrom);
        expect(result).toBe(monthlyTaskCount);
    });

    it('should throw an error if an invalid type is provided', async () => {
        await expect(getTasksGrowthUseCase.execute('INVALID' as any)).rejects.toThrow('Invalid type provided');
    });

    it('should handle errors thrown by the taskRepository', async () => {
        const errorMessage = 'Error counting tasks';
        (taskRepository.countTasksCreatedAfter as jest.Mock).mockRejectedValue(new Error(errorMessage));

        await expect(getTasksGrowthUseCase.execute('DAILY')).rejects.toThrow(errorMessage);
    });

});