import { CountUsersUseCase } from '../count-users/count-users.usecase';
import { CountUsersByPlanUseCase } from '../count-users-by-plan/count-users-by-plan.usecase';
import { CountUsersByTypeUseCase } from '../count-users-by-type/count-users-by-type.usecase';
import { GetUserGrowthUseCase } from '../get-user-growth/get-user-growth.usecase';
import { GetUsersInsightsUseCase, UsersInsights } from './get-users-insights.usecase';

describe('GetUserInsightsUseCase', () => {
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

  it('should return user insights', async () => {
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
      return Promise.reject();
    });
    (countUsersByTypeUseCase.execute as jest.Mock).mockImplementation((type: string) => {
      if (type === 'ADMIN') return Promise.resolve(adminUsersCount);
      if (type === 'DEFAULT') return Promise.resolve(defaultUsersCount);
      return Promise.reject();
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

  it('should handle errors in counting users and plans', async () => {
    const errorMessage = 'Error fetching user insights';

    (countUsersUseCase.execute as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getUserInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

});