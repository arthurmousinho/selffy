import { ProjectRepository } from "@application/repositories/project.repository";
import { GetProjectsGrowthUseCase } from "./get-projects-growth.usecase"; // Adjust the import path as necessary
import { subDays, subWeeks, subMonths } from 'date-fns';

describe('GetProjectsGrowthUseCase', () => {
    let projectRepository: ProjectRepository;
    let getProjectsGrowthUseCase: GetProjectsGrowthUseCase;

    beforeEach(() => {
        projectRepository = {
            countProjectsCreatedAfter: jest.fn(),
        } as unknown as ProjectRepository;
        getProjectsGrowthUseCase = new GetProjectsGrowthUseCase(projectRepository);
    });

    it('should return the number of projects created in the last day', async () => {
        const dailyProjectCount = 5;
        const dateFrom = subDays(new Date(), 1);
        (projectRepository.countProjectsCreatedAfter as jest.Mock).mockResolvedValue(dailyProjectCount);

        const result = await getProjectsGrowthUseCase.execute('DAILY');

        expect(projectRepository.countProjectsCreatedAfter).toHaveBeenCalledWith(dateFrom);
        expect(result).toBe(dailyProjectCount);
    });

    it('should return the number of projects created in the last week', async () => {
        const weeklyProjectCount = 15;
        const dateFrom = subWeeks(new Date(), 1);
        (projectRepository.countProjectsCreatedAfter as jest.Mock).mockResolvedValue(weeklyProjectCount);

        const result = await getProjectsGrowthUseCase.execute('WEEKLY');

        expect(projectRepository.countProjectsCreatedAfter).toHaveBeenCalledWith(dateFrom);
        expect(result).toBe(weeklyProjectCount);
    });

    it('should return the number of projects created in the last month', async () => {
        const monthlyProjectCount = 50;
        const dateFrom = subMonths(new Date(), 1);
        (projectRepository.countProjectsCreatedAfter as jest.Mock).mockResolvedValue(monthlyProjectCount);

        const result = await getProjectsGrowthUseCase.execute('MONTHLY');

        expect(projectRepository.countProjectsCreatedAfter).toHaveBeenCalledWith(dateFrom);
        expect(result).toBe(monthlyProjectCount);
    });

    it('should throw an error if an invalid type is provided', async () => {
        await expect(getProjectsGrowthUseCase.execute('INVALID' as any)).rejects.toThrow('Invalid type provided');
    });

    it('should handle errors thrown by the projectRepository', async () => {
        const errorMessage = 'Error counting projects';
        (projectRepository.countProjectsCreatedAfter as jest.Mock).mockRejectedValue(new Error(errorMessage));

        await expect(getProjectsGrowthUseCase.execute('DAILY')).rejects.toThrow(errorMessage);
    });

});
