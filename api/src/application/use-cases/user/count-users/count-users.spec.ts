import { UserRepository } from '@domain/repositories/user.repository';
import { CountUsersUseCase } from './count-users.usecase';

describe('Count Users UseCase', () => {

  let userRepository: UserRepository;
  let countUsersUseCase: CountUsersUseCase;

  beforeEach(() => {
    userRepository = {
      count: jest.fn(),
    } as unknown as UserRepository;
    countUsersUseCase = new CountUsersUseCase(userRepository);
  });

  it('should return the number of users', async () => {
    const userCount = 10;
    (userRepository.count as jest.Mock).mockResolvedValue(userCount);
    const result = await countUsersUseCase.execute();

    expect(userRepository.count).toHaveBeenCalled();
    expect(result).toBe(userCount);
  });

  it('should handle errors thrown by the repository', async () => {
    const errorMessage = 'Error counting users';
    (userRepository.count as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(countUsersUseCase.execute()).rejects.toThrow(errorMessage);
  });

});