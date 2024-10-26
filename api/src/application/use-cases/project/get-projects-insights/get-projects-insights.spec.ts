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

  it('should return projects insights', async () => {
    const projectsCount = 50;
    const inProgressProjectsCount = 20;
    const finishedProjectsCount = 30;
    const projectsTotalRevenue = 100000;

    (countProjectsUseCase.execute as jest.Mock).mockResolvedValue(projectsCount);
    (countProjectsByStatusUseCase.execute as jest.Mock).mockImplementation((status: string) => {
      if (status === 'IN_PROGRESS') return Promise.resolve(inProgressProjectsCount);
      if (status === 'FINISHED') return Promise.resolve(finishedProjectsCount);
      return Promise.reject();
    });
    (getTotalRevenueUseCase.execute as jest.Mock).mockResolvedValue(projectsTotalRevenue);

    const result: ProjectsInsights = await getProjectsInsightsUseCase.execute();

    expect(result).toEqual({
      total: projectsCount,
      inProgress: inProgressProjectsCount,
      finished: finishedProjectsCount,
      totalRevenue: projectsTotalRevenue,
    });

    expect(countProjectsUseCase.execute).toHaveBeenCalled();
    expect(countProjectsByStatusUseCase.execute).toHaveBeenCalledWith('IN_PROGRESS');
    expect(countProjectsByStatusUseCase.execute).toHaveBeenCalledWith('FINISHED');
    expect(getTotalRevenueUseCase.execute).toHaveBeenCalled();
  });

  it('should handle errors in counting projects or fetching revenue', async () => {
    const errorMessage = 'Error fetching projects insights';

    (countProjectsUseCase.execute as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getProjectsInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

});