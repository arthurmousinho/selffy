import { makeUser } from "@test/factories/user.factory";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { FindAllUsersUseCase } from "./find-all-users.usecase";
import { UserRepository } from "@domain/repositories/user.repository";

describe('Find All Users UseCase', () => {
    
    let findAllUsersUseCase: FindAllUsersUseCase;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
    });

    it('should return an empty list if no users exist', async () => {
        const users = await findAllUsersUseCase.execute(1, 10);

        expect(users.data).toEqual([]);
        expect(users.meta.page).toBe(1);
        expect(users.meta.total).toBe(0);
        expect(users.meta.totalPages).toBe(0);
        expect(users.meta.limit).toBe(10);
    });

    it('should return paginated users', async () => {
        const user1 = makeUser({ name: 'John Doe', email: 'john@example.com' });
        const user2 = makeUser({ name: 'Jane Doe', email: 'jane@example.com' });

        await userRepository.create(user1);
        await userRepository.create(user2);

        const users = await findAllUsersUseCase.execute(1, 1);

        expect(users.data.length).toBe(1);
        expect(users.meta.page).toBe(1);
        expect(users.meta.total).toBe(2);
        expect(users.meta.totalPages).toBe(2);
        expect(users.meta.limit).toBe(1);
    });

    it('should return users for a specific page', async () => {
        const user1 = makeUser({ name: 'John Doe', email: 'john@example.com' });
        const user2 = makeUser({ name: 'Jane Doe', email: 'jane@example.com' });

        await userRepository.create(user1);
        await userRepository.create(user2);

        const users = await findAllUsersUseCase.execute(2, 1);

        expect(users.data.length).toBe(1);
        expect(users.data[0].getEmail()).toBe(user2.getEmail());
        expect(users.meta.page).toBe(2);
        expect(users.meta.total).toBe(2);
        expect(users.meta.totalPages).toBe(2);
        expect(users.meta.limit).toBe(1);
    });

});