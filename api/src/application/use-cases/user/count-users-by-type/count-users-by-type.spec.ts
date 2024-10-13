import { UserRepository } from '@application/repositories/user.repository';
import { CountUsersByTypeUseCase } from './count-users-by-type.usecase';
import { UserType } from '@application/entities/user/user.entity';

describe('CountUsersByTypeUseCase', () => {
  let userRepository: UserRepository;
  let countUsersByTypeUseCase: CountUsersByTypeUseCase;

  beforeEach(() => {
    userRepository = {
      countByType: jest.fn(),
    } as unknown as UserRepository;
    countUsersByTypeUseCase = new CountUsersByTypeUseCase(userRepository);
  });

  it('should return the number of users for a given type', async () => {
    const userCount = 25;
    const userType: UserType = 'ADMIN'; 
    (userRepository.countByType as jest.Mock).mockResolvedValue(userCount);

    const result = await countUsersByTypeUseCase.execute(userType);

    expect(userRepository.countByType).toHaveBeenCalledWith(userType);
    expect(result).toBe(userCount);
  });

});