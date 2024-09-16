import { RoleRepository } from "@application/repositories/role.repository";
import { UpdateRoleUseCase } from "./update-role.usecase";
import { makeRole } from "@test/factories/role.factory";
import { RoleNotFoundError } from "@application/errors/role/role-not-found.error";
import { InMemoryRoleRepository } from "@test/repositories/in-memory-role.repository";

describe('Update Role UseCase', () => {

    let updateRoleUseCase: UpdateRoleUseCase;
    let roleRepository: RoleRepository;

    beforeEach(() => {
        roleRepository = new InMemoryRoleRepository();
        updateRoleUseCase = new UpdateRoleUseCase(roleRepository);
    });

    it('should throw an error if the role does not exist', async () => {
        const nonExistentRole = makeRole();

        await expect(updateRoleUseCase.execute(nonExistentRole)).rejects.toThrow(RoleNotFoundError);
    });

    it('should update the role if the role exists', async () => {
        const existingRole = makeRole();  
        await roleRepository.create(existingRole);  
    
        existingRole.setKey('Updated Role Key');

        await updateRoleUseCase.execute(existingRole);

        const updatedRole = await roleRepository.findById(existingRole.getId());

        expect(updatedRole).not.toBeNull();
        if (updatedRole) {
        
            expect(updatedRole.getKey()).toBe('Updated Role Key');
            expect(updatedRole.getUpdatedAt()).toBeInstanceOf(Date);
        }
    });

});