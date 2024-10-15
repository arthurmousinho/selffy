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
        const roles = await findAllRolesUseCase.execute(1, 10);

        expect(roles.data).toEqual([]);
        expect(roles.meta.page).toBe(1);
        expect(roles.meta.total).toBe(0);
        expect(roles.meta.totalPages).toBe(0);
        expect(roles.meta.limit).toBe(10);
    });

    it('should return paginated roles', async () => {
        const role1 = makeRole({ key: 'ADMIN' });
        const role2 = makeRole({ key: 'USER' });

        await roleRepository.create(role1);
        await roleRepository.create(role2);

        const roles = await findAllRolesUseCase.execute(1, 1);

        expect(roles.data.length).toBe(1);
        expect(roles.meta.page).toBe(1);
        expect(roles.meta.total).toBe(2);
        expect(roles.meta.totalPages).toBe(2);
        expect(roles.meta.limit).toBe(1);
    });

    it('should return roles for a specific page', async () => {
        const role1 = makeRole({ key: 'ADMIN' });
        const role2 = makeRole({ key: 'USER' });

        await roleRepository.create(role1);
        await roleRepository.create(role2);

        const roles = await findAllRolesUseCase.execute(2, 1);

        expect(roles.data.length).toBe(1);
        expect(roles.data[0].getKey()).toBe(role2.getKey());
        expect(roles.meta.page).toBe(2);
        expect(roles.meta.total).toBe(2);
        expect(roles.meta.totalPages).toBe(2);
        expect(roles.meta.limit).toBe(1);
    });

});