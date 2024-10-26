import { CountProjectsUseCase } from '../count-projects/count-projects.usecase';
import { CountProjectByStatusUseCase } from '../count-projects-by-status/count-projects-by-status.usecase';
import { GetTotalRevenueUseCase } from '../get-total-revenue/get-total-revenue.usecase';
import { GetProjectsInsightsUseCase, ProjectsInsights } from './get-projects-insights.usecase';
import { GetProjectsGrowthUseCase } from '../get-projects-growth/get-projects-growth.usecase';

describe('GetProjectsInsightsUseCase', () => {

  let getProjectsInsightsUseCase: GetProjectsInsightsUseCase;
  let countProjectsUseCase: CountProjectsUseCase;
  let countProjectsByStatusUseCase: CountProjectByStatusUseCase;
  let getTotalRevenueUseCase: GetTotalRevenueUseCase;
  let getProjectsGrowthUseCase: GetProjectsGrowthUseCase;

  beforeEach(() => {
    countProjectsUseCase = { execute: jest.fn() } as unknown as CountProjectsUseCase;
    countProjectsByStatusUseCase = { execute: jest.fn() } as unknown as CountProjectByStatusUseCase;
    getTotalRevenueUseCase = { execute: jest.fn() } as unknown as GetTotalRevenueUseCase;
    getProjectsGrowthUseCase = { execute: jest.fn() } as unknown as GetProjectsGrowthUseCase;

    getProjectsInsightsUseCase = new GetProjectsInsightsUseCase(
      countProjectsUseCase,
      countProjectsByStatusUseCase,
      getTotalRevenueUseCase,
      getProjectsGrowthUseCase
    );
  });

  it('should return projects insights successfully', async () => {
    const projectsCount = 50;
    const inProgressProjectsCount = 20;
    const finishedProjectsCount = 30;
    const projectsTotalRevenue = 100000;
    const projectsMonthlyGrowth = 10;

    (countProjectsUseCase.execute as jest.Mock).mockResolvedValue(projectsCount);
    (countProjectsByStatusUseCase.execute as jest.Mock).mockImplementation((status: string) => {
      if (status === 'IN_PROGRESS') return Promise.resolve(inProgressProjectsCount);
      if (status === 'FINISHED') return Promise.resolve(finishedProjectsCount);
      return Promise.reject(new Error('Status not found'));
    });
    (getTotalRevenueUseCase.execute as jest.Mock).mockResolvedValue(projectsTotalRevenue);
    (getProjectsGrowthUseCase.execute as jest.Mock).mockResolvedValue(projectsMonthlyGrowth);

    const result: ProjectsInsights = await getProjectsInsightsUseCase.execute();

    expect(result).toEqual({
      total: projectsCount,
      inProgress: inProgressProjectsCount,
      finished: finishedProjectsCount,
      totalRevenue: projectsTotalRevenue,
      monthlyGrowth: projectsMonthlyGrowth,
    });

    expect(countProjectsUseCase.execute).toHaveBeenCalled();
    expect(countProjectsByStatusUseCase.execute).toHaveBeenCalledWith('IN_PROGRESS');
    expect(countProjectsByStatusUseCase.execute).toHaveBeenCalledWith('FINISHED');
    expect(getTotalRevenueUseCase.execute).toHaveBeenCalled();
    expect(getProjectsGrowthUseCase.execute).toHaveBeenCalledWith('MONTHLY');
  });

  it('should handle errors in counting total projects', async () => {
    const errorMessage = 'Error fetching total projects';
    (countProjectsUseCase.execute as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getProjectsInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in counting in-progress projects', async () => {
    const errorMessage = 'Error fetching in-progress projects';
    (countProjectsByStatusUseCase.execute as jest.Mock).mockImplementation((status: string) => {
      if (status === 'IN_PROGRESS') return Promise.reject(new Error(errorMessage));
      return Promise.resolve(0);
    });

    await expect(getProjectsInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in counting finished projects', async () => {
    const errorMessage = 'Error fetching finished projects';
    (countProjectsByStatusUseCase.execute as jest.Mock).mockImplementation((status: string) => {
      if (status === 'FINISHED') return Promise.reject(new Error(errorMessage));
      return Promise.resolve(0);
    });

    await expect(getProjectsInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in fetching total revenue', async () => {
    const errorMessage = 'Error fetching total revenue';
    (getTotalRevenueUseCase.execute as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getProjectsInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in fetching monthly growth', async () => {
    const errorMessage = 'Error fetching monthly growth';
    (getProjectsGrowthUseCase.execute as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getProjectsInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

});