import { RoleRepository } from "@application/repositories/role.repository";
import { FindRoleByIdUseCase } from "./find-role-by-id.usecase";
import { InMemoryRoleRepository } from "@test/repositories/in-memory-role.repository";
import { RoleNotFoundError } from "@application/errors/role/role-not-found.error";
import { makeRole } from "@test/factories/role.factory";

describe('FindRoleById UseCase', () => {
    
    let findRoleByIdUseCase: FindRoleByIdUseCase;
    let roleRepository: RoleRepository;

    beforeEach(() => {
        roleRepository = new InMemoryRoleRepository();
        findRoleByIdUseCase = new FindRoleByIdUseCase(roleRepository);
    });

    it('should throw an error if the role does not exist', async () => {
        await expect(findRoleByIdUseCase.execute('non-existing-id')).rejects.toThrow(RoleNotFoundError);
    });

    it('should return the role if it exists', async () => {
        const role = makeRole();
        await roleRepository.create(role);

        const foundRole = await findRoleByIdUseCase.execute(role.getId());

        expect(foundRole).toBeDefined();
        expect(foundRole.getId()).toBe(role.getId());
        expect(foundRole.getKey()).toBe(role.getKey());
    });

});