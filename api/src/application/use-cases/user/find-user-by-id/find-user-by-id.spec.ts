import { makeUser } from "@test/factories/user.factory";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { FindUserByIdUseCase } from "./find-user-by-id.usecase";
import { UserRepository } from "@domain/repositories/user.repository";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";

describe('FindUserById UseCase', () => {
    let findUserByIdUseCase: FindUserByIdUseCase;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
    });

    it('should throw an error if the user or request user does not exist', async () => {
        const request = {
            userId: 'non-existing-user-id',
            requestUserId: 'non-existing-request-user-id'
        };

        await expect(findUserByIdUseCase.execute(request)).rejects.toThrow(UserNotFoundError);
    });

    it('should throw an error if the request user is not authorized to access the user', async () => {
        const requestUser = makeUser({ role: 'FREE' });
        const otherUser = makeUser({ role: 'FREE' });

        await Promise.all([
            userRepository.create(requestUser),
            userRepository.create(otherUser)
        ]);

        const request = {
            userId: otherUser.getId(),
            requestUserId: requestUser.getId()
        };

        await expect(findUserByIdUseCase.execute(request)).rejects.toThrow(UnauthorizedUserError);
    });

    it('should return the user if they exist and the request user is authorized', async () => {
        const requestUser = makeUser({ role: 'FREE' });
        await userRepository.create(requestUser);

        const request = {
            userId: requestUser.getId(),
            requestUserId: requestUser.getId()
        };

        const foundUser = await findUserByIdUseCase.execute(request);

        expect(foundUser).toBeDefined();
        expect(foundUser.getId()).toBe(requestUser.getId());
    });

    it('should allow admin to access any user', async () => {
        const adminUser = makeUser({ role: 'ADMIN' });
        const otherUser = makeUser({ role: 'FREE' });

        await Promise.all([
            userRepository.create(adminUser),
            userRepository.create(otherUser)
        ]);

        const request = {
            userId: otherUser.getId(),
            requestUserId: adminUser.getId()
        };

        const foundUser = await findUserByIdUseCase.execute(request);

        expect(foundUser).toBeDefined();
        expect(foundUser.getId()).toBe(otherUser.getId());
    });
});
