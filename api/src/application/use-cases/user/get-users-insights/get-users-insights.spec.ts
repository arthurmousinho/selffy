import { CountUsersUseCase } from '../count-users/count-users.usecase';
import { CountUsersByPlanUseCase } from '../count-users-by-plan/count-users-by-plan.usecase';
import { CountUsersByTypeUseCase } from '../count-users-by-type/count-users-by-type.usecase';
import { GetUserGrowthUseCase } from '../get-user-growth/get-user-growth.usecase';
import { GetUsersInsightsUseCase, UsersInsights } from './get-users-insights.usecase';

describe('GetUsersInsightsUseCase', () => {
  let getUserInsightsUseCase: GetUsersInsightsUseCase;
  let countUsersUseCase: CountUsersUseCase;
  let countUsersByPlanUseCase: CountUsersByPlanUseCase;
  let countUsersByTypeUseCase: CountUsersByTypeUseCase;
  let getUserGrowthUseCase: GetUserGrowthUseCase;

  beforeEach(() => {
    countUsersUseCase = { execute: jest.fn() } as unknown as CountUsersUseCase;
    countUsersByPlanUseCase = { execute: jest.fn() } as unknown as CountUsersByPlanUseCase;
    countUsersByTypeUseCase = { execute: jest.fn() } as unknown as CountUsersByTypeUseCase;
    getUserGrowthUseCase = { execute: jest.fn() } as unknown as GetUserGrowthUseCase;

    getUserInsightsUseCase = new GetUsersInsightsUseCase(
      countUsersUseCase,
      countUsersByPlanUseCase,
      countUsersByTypeUseCase,
      getUserGrowthUseCase
    );
  });

  it('should return user insights successfully', async () => {
    const usersCount = 100;
    const freeUsersCount = 60;
    const premiumUsersCount = 30;
    const adminUsersCount = 5;
    const defaultUsersCount = 95;
    const usersGrowth = 10;

    (countUsersUseCase.execute as jest.Mock).mockResolvedValue(usersCount);
    (countUsersByPlanUseCase.execute as jest.Mock).mockImplementation((plan: string) => {
      if (plan === 'FREE') return Promise.resolve(freeUsersCount);
      if (plan === 'PREMIUM') return Promise.resolve(premiumUsersCount);
      return Promise.reject(new Error('Plan not found'));
    });
    (countUsersByTypeUseCase.execute as jest.Mock).mockImplementation((type: string) => {
      if (type === 'ADMIN') return Promise.resolve(adminUsersCount);
      if (type === 'DEFAULT') return Promise.resolve(defaultUsersCount);
      return Promise.reject(new Error('Type not found'));
    });
    (getUserGrowthUseCase.execute as jest.Mock).mockResolvedValue(usersGrowth);

    const result: UsersInsights = await getUserInsightsUseCase.execute();

    expect(result).toEqual({
      total: usersCount,
      free: freeUsersCount,
      premium: premiumUsersCount,
      admin: adminUsersCount,
      default: defaultUsersCount,
      monthlyGrowth: usersGrowth,
    });

    expect(countUsersUseCase.execute).toHaveBeenCalled();
    expect(countUsersByPlanUseCase.execute).toHaveBeenCalledWith('FREE');
    expect(countUsersByPlanUseCase.execute).toHaveBeenCalledWith('PREMIUM');
    expect(countUsersByTypeUseCase.execute).toHaveBeenCalledWith('ADMIN');
    expect(countUsersByTypeUseCase.execute).toHaveBeenCalledWith('DEFAULT');
    expect(getUserGrowthUseCase.execute).toHaveBeenCalledWith('MONTHLY');
  });

  it('should handle errors in counting total users', async () => {
    const errorMessage = 'Error fetching total users';
    (countUsersUseCase.execute as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getUserInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in counting free users', async () => {
    const errorMessage = 'Error fetching free users';
    (countUsersByPlanUseCase.execute as jest.Mock).mockImplementation((plan: string) => {
      if (plan === 'FREE') return Promise.reject(new Error(errorMessage));
      return Promise.resolve(0);
    });

    await expect(getUserInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in counting premium users', async () => {
    const errorMessage = 'Error fetching premium users';
    (countUsersByPlanUseCase.execute as jest.Mock).mockImplementation((plan: string) => {
      if (plan === 'PREMIUM') return Promise.reject(new Error(errorMessage));
      return Promise.resolve(0);
    });

    await expect(getUserInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in counting admin users', async () => {
    const errorMessage = 'Error fetching admin users';
    (countUsersByTypeUseCase.execute as jest.Mock).mockImplementation((type: string) => {
      if (type === 'ADMIN') return Promise.reject(new Error(errorMessage));
      return Promise.resolve(0);
    });

    await expect(getUserInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in counting default users', async () => {
    const errorMessage = 'Error fetching default users';
    (countUsersByTypeUseCase.execute as jest.Mock).mockImplementation((type: string) => {
      if (type === 'DEFAULT') return Promise.reject(new Error(errorMessage));
      return Promise.resolve(0);
    });

    await expect(getUserInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

  it('should handle errors in counting monthly growth', async () => {
    const errorMessage = 'Error fetching monthly growth';
    (getUserGrowthUseCase.execute as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getUserInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });
  
});