import { RoleRepository } from '@application/repositories/role.repository';
import { CountRolesUseCase } from './count-roles.usecase';

describe('Count Roles UseCase', () => {

  let roleRepository: RoleRepository;
  let countRolesUseCase: CountRolesUseCase;

  beforeEach(() => {
    roleRepository = {
      count: jest.fn(),
    } as unknown as RoleRepository;
    countRolesUseCase = new CountRolesUseCase(roleRepository);
  });

  it('should return the number of roles', async () => {
    const roleCount = 5;
    (roleRepository.count as jest.Mock).mockResolvedValue(roleCount);
    const result = await countRolesUseCase.execute();

    expect(roleRepository.count).toHaveBeenCalled();
    expect(result).toBe(roleCount);
  });

  it('should handle errors thrown by the repository', async () => {
    const errorMessage = 'Error counting roles';
    (roleRepository.count as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(countRolesUseCase.execute()).rejects.toThrow(errorMessage);
  });

});
