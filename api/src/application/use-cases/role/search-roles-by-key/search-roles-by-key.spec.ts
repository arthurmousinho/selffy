import { InMemoryRoleRepository } from "@test/repositories/in-memory-role.repository";
import { SearchRolesByKeyUseCase } from "./search-roles-by-key.usecase";
import { makeRole } from "@test/factories/role.factory";

describe('Search Roles By Key UseCase', () => {
    
    let searchRoleByKeyUseCase: SearchRolesByKeyUseCase;
    let roleRepository: InMemoryRoleRepository;

    beforeEach(() => {
        roleRepository = new InMemoryRoleRepository();
        searchRoleByKeyUseCase = new SearchRolesByKeyUseCase(roleRepository);
    });

    it('should return an empty array if no roles are found with the given key', async () => {
        const roles = await searchRoleByKeyUseCase.execute({
            key: 'nonexistent.key',
            page: 1,
            limit: 10
        });
        
        expect(roles.data).toEqual([]);
        expect(roles.meta.page).toBe(1);
        expect(roles.meta.totalPages).toBe(0);
    });

    it('should return roles that match the given key', async () => {
        const role1 = makeRole({ key: 'role.admin' });
        const role2 = makeRole({ key: 'role.user' });
        const role3 = makeRole({ key: 'role.admin' });

        await roleRepository.create(role1);
        await roleRepository.create(role2);
        await roleRepository.create(role3);

        const roles = await searchRoleByKeyUseCase.execute({
            key: 'role.admin',
            page: 1,
            limit: 10
        });

        expect(roles.data.length).toBe(2); 
        expect(roles.data[0].getKey()).toBe('role.admin');
        expect(roles.data[1].getKey()).toBe('role.admin');
        expect(roles.meta.page).toBe(1);
        expect(roles.meta.totalPages).toBe(1);
    });

});