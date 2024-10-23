import { UserRepository } from "@application/repositories/user.repository";
import { UpdateUserUseCase } from "./update-user.usecase";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { makeUser } from "@test/factories/user.factory";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { GetRolesForUserTypeUseCase } from "@application/use-cases/role/get-roles-for-user-type/get-roles-for-user-type";

describe('Update User UseCase', () => {

    let updateUserUseCase: UpdateUserUseCase;
    let userRepository: UserRepository;
    let getRolesForUserTypeUseCase: GetRolesForUserTypeUseCase;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        getRolesForUserTypeUseCase = {
            execute: jest.fn().mockResolvedValue(['default-role'])
        } as unknown as GetRolesForUserTypeUseCase;
        
        updateUserUseCase = new UpdateUserUseCase(userRepository, getRolesForUserTypeUseCase);
    });

    it('should throw an error if the user does not exist', async () => {
        await expect(updateUserUseCase.execute({
            id: 'non-existent-id',
            name: 'Some Name',
            email: 'some@example.com',
            type: 'DEFAULT',
            plan: 'FREE',
        })).rejects.toThrow(UserNotFoundError);
    });

    it('should update the user if the user exists', async () => {
        const existingUser = makeUser();
        await userRepository.create(existingUser);

        await updateUserUseCase.execute({
            id: existingUser.getId(),
            name: 'Updated Name',
            email: 'updated@example.com',
            type: existingUser.getType(),  
            plan: 'FREE',
        });

        const updatedUser = await userRepository.findById(existingUser.getId());
        expect(updatedUser).toBeDefined();
        expect(updatedUser.getName()).toBe('Updated Name');
        expect(updatedUser.getEmail()).toBe('updated@example.com');
    });

    it('should update the roles if the user type changes', async () => {
        const existingUser = makeUser(); // DEFAULT user
        await userRepository.create(existingUser);

        await updateUserUseCase.execute({
            id: existingUser.getId(),
            name: 'Updated Name',
            email: 'updated@example.com',
            type: 'ADMIN',  
            plan: 'FREE',
        });

        const adminRoles = await getRolesForUserTypeUseCase.execute('ADMIN');

        const updatedUser = await userRepository.findById(existingUser.getId());
        expect(updatedUser).toBeDefined();
        expect(updatedUser.getType()).toBe('ADMIN');
        expect(updatedUser.getRoles()).toEqual(adminRoles);  
    });

});