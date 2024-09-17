import { makeUser } from "@test/factories/user.factory";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { FindAllUsersUseCase } from "./find-all-users.usecase";
import { UserRepository } from "@application/repositories/user.repository";

describe('Find All Users UseCase', () => {
    
    let findAllUsersUseCase: FindAllUsersUseCase;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
    });

    it('should return an empty list if no users exist', async () => {
        const users = await findAllUsersUseCase.execute();

        expect(users).toEqual([]);
    });

    it('should return all users if they exist', async () => {
        const user1 = makeUser({ name: 'John Doe', email: 'john@example.com' });
        const user2 = makeUser({ name: 'Jane Doe', email: 'jane@example.com' });

        await userRepository.create(user1);
        await userRepository.create(user2);

        const users = await findAllUsersUseCase.execute();

        expect(users.length).toBe(2);
        expect(users).toContainEqual(user1);
        expect(users).toContainEqual(user2);
    });

});