import { UserRepository } from '@domain/repositories/user.repository';
import { GetUserGrowthUseCase } from './get-user-growth.usecase';
import { subDays, subWeeks, subMonths } from 'date-fns';

describe('GetUserGrowthUseCase', () => {
  let userRepository: UserRepository;
  let getUserGrowthUseCase: GetUserGrowthUseCase;

  beforeEach(() => {
    userRepository = {
      countUsersCreatedAfter: jest.fn(),
    } as unknown as UserRepository;
    getUserGrowthUseCase = new GetUserGrowthUseCase(userRepository);
  });

  it('should return the number of users created in the last day', async () => {
    const dailyUserCount = 5;
    const dateFrom = subDays(new Date(), 1);
    (userRepository.countUsersCreatedAfter as jest.Mock).mockResolvedValue(dailyUserCount);

    const result = await getUserGrowthUseCase.execute('DAILY');

    expect(userRepository.countUsersCreatedAfter).toHaveBeenCalledWith(dateFrom);
    expect(result).toBe(dailyUserCount);
  });

  it('should return the number of users created in the last week', async () => {
    const weeklyUserCount = 15;
    const dateFrom = subWeeks(new Date(), 1);
    (userRepository.countUsersCreatedAfter as jest.Mock).mockResolvedValue(weeklyUserCount);

    const result = await getUserGrowthUseCase.execute('WEEKLY');

    expect(userRepository.countUsersCreatedAfter).toHaveBeenCalledWith(dateFrom);
    expect(result).toBe(weeklyUserCount);
  });

  it('should return the number of users created in the last month', async () => {
    const monthlyUserCount = 50;
    const dateFrom = subMonths(new Date(), 1);
    (userRepository.countUsersCreatedAfter as jest.Mock).mockResolvedValue(monthlyUserCount);

    const result = await getUserGrowthUseCase.execute('MONTHLY');

    expect(userRepository.countUsersCreatedAfter).toHaveBeenCalledWith(dateFrom);
    expect(result).toBe(monthlyUserCount);
  });

  it('should throw an error if an invalid type is provided', async () => {
    await expect(getUserGrowthUseCase.execute('INVALID' as any)).rejects.toThrow('Invalid type provided');
  });

  it('should handle errors thrown by the userRepository', async () => {
    const errorMessage = 'Error counting users';
    (userRepository.countUsersCreatedAfter as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getUserGrowthUseCase.execute('DAILY')).rejects.toThrow(errorMessage);
  });

});