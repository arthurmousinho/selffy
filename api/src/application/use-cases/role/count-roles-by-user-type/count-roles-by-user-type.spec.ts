import { RoleRepository } from '@application/repositories/role.repository';
import { CountRolesByUserTypeUseCase } from './count-roles-by-user-type.usecase';
import { UserType } from '@application/entities/user/user.entity';

describe('CountRolesByUserTypeUseCase', () => {
  let roleRepository: RoleRepository;
  let countRolesByUserTypeUseCase: CountRolesByUserTypeUseCase;

  beforeEach(() => {
    roleRepository = {
      countByUserType: jest.fn(),
    } as unknown as RoleRepository;
    countRolesByUserTypeUseCase = new CountRolesByUserTypeUseCase(roleRepository);
  });

  it('should return the number of roles for a given user type', async () => {
    const userType: UserType = 'ADMIN';
    const roleCount = 5;

    (roleRepository.countByUserType as jest.Mock).mockResolvedValue(roleCount);

    const result = await countRolesByUserTypeUseCase.execute(userType);

    expect(roleRepository.countByUserType).toHaveBeenCalledWith(userType);
    expect(result).toBe(roleCount);
  });

  it('should handle errors thrown by the roleRepository', async () => {
    const userType: UserType = 'DEFAULT';
    const errorMessage = 'Error counting roles';
    
    (roleRepository.countByUserType as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(countRolesByUserTypeUseCase.execute(userType)).rejects.toThrow(errorMessage);
  });
  
});