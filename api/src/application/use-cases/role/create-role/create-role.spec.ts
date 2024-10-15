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
        await createRoleUseCase.execute({
            key: newRole.getKey(),
            userTypes: newRole.getUserTypes()
        });

        await expect(createRoleUseCase.execute({
            key: newRole.getKey(),
            userTypes: newRole.getUserTypes()
        })).rejects.toThrow(RoleAlreadyExistsError);
    });

    it('should create a new role if the role does not exist', async () => {
        await createRoleUseCase.execute({
            key: 'role.test',
            userTypes: ['ADMIN', 'DEFAULT']
        });

        const pageableRoles = await roleRepository.findAll(1, 10);
        expect(pageableRoles.data.length).toBe(1);
        expect(pageableRoles.data[0].getKey()).toBe('role.test');
        expect(pageableRoles.data[0].getUserTypes()).toEqual(['ADMIN', 'DEFAULT']);
    });

});