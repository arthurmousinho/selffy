import { makeUser } from "@test/factories/user.factory";
import { SearchUserByNameUseCase } from "./search-user-by-name.usecase";
import { UserRepository } from "@application/repositories/user.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { User } from "@application/entities/user/user.entity";
import { makeRole } from "@test/factories/role.factory";

describe('SearchUserByNameUseCase', () => {
    let searchUserByNameUseCase: SearchUserByNameUseCase;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository(); // Repositório em memória para testes
        searchUserByNameUseCase = new SearchUserByNameUseCase(userRepository);
    });

    it('should return multiple users if users with the given name exist', async () => {
        const user1 = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            roles: [makeRole()],
            projects: [],
        });

        const user2 = new User({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password456',
            roles: [makeRole()],
            projects: [],
        });

        await userRepository.create(user1);
        await userRepository.create(user2);

        const foundUsers = await searchUserByNameUseCase.execute({
            name: 'John Doe',
            page: 1,
            limit: 10
        });

        expect(foundUsers.data.length).toBe(2);
        expect(foundUsers.data[0].getName()).toBe('John Doe');
        expect(foundUsers.data[1].getName()).toBe('John Doe');
        expect(foundUsers.meta.page).toBe(1);
        expect(foundUsers.meta.totalPages).toBe(1);
    });

    it('should return an empty array if no users with the given name exist', async () => {
        const foundUsers = await searchUserByNameUseCase.execute({
            name: 'Non-existent User',
            page: 1,
            limit: 10
        });
        expect(foundUsers.data.length).toBe(0);
    });

});
