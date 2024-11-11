import { UserRepository } from "@domain/repositories/user.repository";
import { UpdateUserUseCase } from "./update-user.usecase";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { makeUser } from "@test/factories/user.factory";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";

describe('Update User UseCase', () => {

    let updateUserUseCase: UpdateUserUseCase;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        updateUserUseCase = new UpdateUserUseCase(userRepository);
    });

    it('should throw an error if the user does not exist', async () => {
        await expect(updateUserUseCase.execute({
            id: 'non-existent-id',
            name: 'Some Name',
            email: 'some@example.com',
            role: 'FREE'
        })).rejects.toThrow(UserNotFoundError);
    });

    it('should update the user if the user exists and role can be changed', async () => {
        const existingUser = makeUser({ role: 'ADMIN' });

        await userRepository.create(existingUser);
        const previousUpdatedAt = existingUser.getUpdatedAt();

        await updateUserUseCase.execute({
            id: existingUser.getId(),
            name: 'Updated Name',
            email: 'updated@example.com',
            role: 'PREMIUM'
        });

        const updatedUser = await userRepository.findById(existingUser.getId());

        expect(updatedUser).toBeDefined();
        expect(updatedUser.getName()).toBe('Updated Name');
        expect(updatedUser.getEmail()).toBe('updated@example.com');
        expect(updatedUser.getRole()).toBe('PREMIUM');
        expect(updatedUser.getUpdatedAt()).not.toEqual(previousUpdatedAt);
    });

    it('should update only name and email if user is FREE or PREMIUM', async () => {
        const existingUser = makeUser({ role: 'FREE' });
    
        await userRepository.create(existingUser);
        const previousUpdatedAt = existingUser.getUpdatedAt();

        await updateUserUseCase.execute({
            id: existingUser.getId(),
            name: 'Updated Name',
            email: 'updated@example.com',
            role: 'ADMIN'
        });

        const updatedUser = await userRepository.findById(existingUser.getId());

        expect(updatedUser).toBeDefined();
        expect(updatedUser.getName()).toBe('Updated Name');
        expect(updatedUser.getEmail()).toBe('updated@example.com');
        expect(updatedUser.getRole()).toBe('FREE'); 
        expect(updatedUser.getUpdatedAt()).not.toEqual(previousUpdatedAt);
    });

});
