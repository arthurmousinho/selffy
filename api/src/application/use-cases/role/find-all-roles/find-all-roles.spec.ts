import { RoleRepository } from "@application/repositories/role.repository";
import { FindAllRolesUseCase } from "./find-all-roles.usecase";
import { InMemoryRoleRepository } from "@test/repositories/in-memory-role.repository";
import { makeRole } from "@test/factories/role.factory";

describe('Find All Roles UseCase', () => {
    
    let findAllRolesUseCase: FindAllRolesUseCase;
    let roleRepository: RoleRepository;

    beforeEach(() => {
        roleRepository = new InMemoryRoleRepository();
        findAllRolesUseCase = new FindAllRolesUseCase(roleRepository);
    });

    it('should return an empty list if no roles exist', async () => {
        const roles = await findAllRolesUseCase.execute();

        expect(roles).toEqual([]);
    });

    it('should return all roles if they exist', async () => {
        const role1 = makeRole({ key: 'ADMIN' });
        const role2 = makeRole({ key: 'USER' });

        await roleRepository.create(role1);
        await roleRepository.create(role2);

        const roles = await findAllRolesUseCase.execute();

        expect(roles.length).toBe(2);
        expect(roles).toContainEqual(role1);
        expect(roles).toContainEqual(role2);
    });

});