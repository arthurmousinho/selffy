import { RoleNotFoundError } from "@application/errors/role/role-not-found.error";
import { makeRole } from "@test/factories/role.factory";
import { InMemoryRoleRepository } from "@test/repositories/in-memory-role.repository";
import { DeleteRoleUseCase } from "./delete-role.usecase";
import { RoleRepository } from "@application/repositories/role.repository";

describe('Delete Role UseCase', () => {

    let deleteRoleUseCase: DeleteRoleUseCase;
    let roleRepository: RoleRepository;

    beforeEach(() => {
        roleRepository = new InMemoryRoleRepository();
        deleteRoleUseCase = new DeleteRoleUseCase(roleRepository);
    });

    it('should throw an error if the role does not exist', async () => {
        const nonExistentRole = makeRole(); 

        await expect(deleteRoleUseCase.execute(nonExistentRole)).rejects.toThrow(RoleNotFoundError);
    });

    it('should delete the role if the role exists', async () => {
        const existingRole = makeRole();  
        await roleRepository.create(existingRole);  

        await deleteRoleUseCase.execute(existingRole);

        const foundRole = await roleRepository.findById(existingRole.getId());

        expect(foundRole).toBeFalsy();
    });

});