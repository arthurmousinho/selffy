import { RoleRepository } from "@application/repositories/role.repository";
import { CreateRoleUseCase } from "./create-role.usecase";
import { InMemoryRoleRepository } from "@test/repositories/in-memory-role.repository";
import { makeRole } from "@test/factories/role.factory";
import { RoleAlreadyExistsError } from "@application/errors/role/role-already-exists.error";

describe('Create Role UseCase', () => {
    let createRoleUseCase: CreateRoleUseCase;
    let roleRepository: RoleRepository;

    beforeEach(() => {
        roleRepository = new InMemoryRoleRepository();
        createRoleUseCase = new CreateRoleUseCase(roleRepository);
    });

    it('should throw an error if the role already exists', async () => {
        const newRole = makeRole();
        await createRoleUseCase.execute(newRole);
        await expect(createRoleUseCase.execute(newRole)).rejects.toThrow(RoleAlreadyExistsError);
    });

    it('should create a new role if the role does not exist', async () => {
        const newRole = makeRole();
        await createRoleUseCase.execute(newRole);
        const roles = await roleRepository.findAll();
        expect(roles.length).toBe(1);
        expect(roles[0].getId()).toBe(newRole.getId());
        expect(roles[0].getKey()).toBe(newRole.getKey());
    });

});