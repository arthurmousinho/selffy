import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UserRepository } from "@domain/repositories/user.repository";
import { makeUser } from "@test/factories/user.factory";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { DeleteUserUsecase } from "./delete-user.usecase";

describe('Delete User UseCase', () => {
    
    let deleteUserUseCase: DeleteUserUsecase;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        deleteUserUseCase = new DeleteUserUsecase(userRepository);
    });

    it('should throw an error if the user does not exist', async () => {
        await expect(deleteUserUseCase.execute('some-id-here')).rejects.toThrow(UserNotFoundError);
    });

    it('should delete the user if the user exists', async () => {
        const existingUser = makeUser();  
        await userRepository.create(existingUser);  

        await deleteUserUseCase.execute(existingUser.getId());

        const foundUser = await userRepository.findById(existingUser.getId());

        expect(foundUser).toBeFalsy();
    });

});