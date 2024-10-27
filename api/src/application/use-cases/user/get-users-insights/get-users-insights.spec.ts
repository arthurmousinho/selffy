import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';
import { CountUsersUseCase } from '../count-users/count-users.usecase';
import { GetUserGrowthUseCase } from '../get-user-growth/get-user-growth.usecase';
import { GetUsersInsightsUseCase, UsersInsights } from './get-users-insights.usecase';

describe('GetUsersInsightsUseCase', () => {
  let getUserInsightsUseCase: GetUsersInsightsUseCase;
  let countUsersUseCase: CountUsersUseCase;
  let getUserGrowthUseCase: GetUserGrowthUseCase;

  beforeEach(() => {
    let repository = new InMemoryUserRepository()

    countUsersUseCase = new CountUsersUseCase(repository);
    getUserGrowthUseCase = new GetUserGrowthUseCase(repository);

    getUserInsightsUseCase = new GetUsersInsightsUseCase(
      countUsersUseCase,
      getUserGrowthUseCase
    );
  });

  it('should return user insights successfully', async () => {
    const usersCount = await countUsersUseCase.execute();
    const usersGrowth = await getUserGrowthUseCase.execute('MONTHLY');

    const result: UsersInsights = await getUserInsightsUseCase.execute();

    expect(result).toEqual({
      total: usersCount,
      monthlyGrowth: usersGrowth,
    });
  });

});