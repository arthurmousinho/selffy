import { makeUser } from "@test/factories/user.factory";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { FindUserByIdUseCase } from "./find-user-by-id.usecase";
import { UserRepository } from "@domain/repositories/user.repository";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";

describe('FindUserById UseCase', () => {
    
    let findUserByIdUseCase: FindUserByIdUseCase;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
    });

    it('should throw an error if the user does not exist', async () => {
        await expect(findUserByIdUseCase.execute('non-existing-id')).rejects.toThrow(UserNotFoundError);
    });

    it('should return the user if they exist', async () => {
        const user = makeUser({ name: 'John Doe' });
        await userRepository.create(user);

        const foundUser = await findUserByIdUseCase.execute(user.getId());

        expect(foundUser).toBeDefined();
        expect(foundUser.getId()).toBe(user.getId());
        expect(foundUser.getName()).toBe('John Doe');
    });

});