import { InMemoryRoleRepository } from "@test/repositories/in-memory-role.repository";
import { makeRole } from "@test/factories/role.factory";
import { GetRolesForUserTypeUseCase } from "./get-roles-for-user-type";
import { UserType } from "@application/entities/user/user.entity";
import { Role } from "@application/entities/role/role.entity";

describe('GetRolesForUserTypeUseCase', () => {

    let getRolesForUserTypeUseCase: GetRolesForUserTypeUseCase;
    let roleRepository: InMemoryRoleRepository;

    beforeEach(() => {
        roleRepository = new InMemoryRoleRepository();
        getRolesForUserTypeUseCase = new GetRolesForUserTypeUseCase(roleRepository);
    });

    it('should return roles for the ADMIN user type', async () => {
        const adminRole1 = makeRole({ key: 'admin.role1', userTypes: ['ADMIN'] });
        const adminRole2 = makeRole({ key: 'admin.role2', userTypes: ['ADMIN'] });
        await roleRepository.create(adminRole1);
        await roleRepository.create(adminRole2);

        roleRepository.getRolesForAdminUser = jest.fn().mockResolvedValue([adminRole1, adminRole2]);

        const roles: Role[] = await getRolesForUserTypeUseCase.execute('ADMIN' as UserType);

        expect(roles.length).toBe(2);
        expect(roles[0].getKey()).toBe('admin.role1');
        expect(roles[1].getKey()).toBe('admin.role2');
        expect(roleRepository.getRolesForAdminUser).toHaveBeenCalled();
    });

    it('should return roles for the DEFAULT user type', async () => {
        const defaultRole1 = makeRole({ key: 'default.role1', userTypes: ['DEFAULT'] });
        const defaultRole2 = makeRole({ key: 'default.role2', userTypes: ['DEFAULT'] });
        await roleRepository.create(defaultRole1);
        await roleRepository.create(defaultRole2);

        roleRepository.getRolesForDefaultUser = jest.fn().mockResolvedValue([defaultRole1, defaultRole2]);

        const roles: Role[] = await getRolesForUserTypeUseCase.execute('DEFAULT' as UserType);

        expect(roles.length).toBe(2);
        expect(roles[0].getKey()).toBe('default.role1');
        expect(roles[1].getKey()).toBe('default.role2');
        expect(roleRepository.getRolesForDefaultUser).toHaveBeenCalled();
    });

    it('should return an empty array for an unknown user type', async () => {
        const roles: Role[] = await getRolesForUserTypeUseCase.execute('UNKNOWN' as UserType);

        expect(roles).toEqual([]);
    })

});
