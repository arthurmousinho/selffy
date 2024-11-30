import { ChangeUserPasswordUseCase } from "./change-user-password.usecase";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { UserRepository } from "@domain/repositories/user.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { makeUser } from "@test/factories/user.factory";
import { InvalidUserCredentialsError } from "@application/errors/user/invalid-user-credentials.error";
import * as bcrypt from 'bcryptjs';

describe("ChangeUserPassword UseCase", () => {
    let changeUserPasswordUseCase: ChangeUserPasswordUseCase;
    let userRepository: UserRepository;
    let findUserByIdUseCase: FindUserByIdUseCase;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        changeUserPasswordUseCase = new ChangeUserPasswordUseCase(
            userRepository,
            findUserByIdUseCase
        );
    });

    it("should change the user's password if the current password is correct", async () => {
        const hashedPassword = await bcrypt.hash("oldPassword123", 10);
        const user = makeUser({ password: hashedPassword });

        await userRepository.create(user);

        const request = {
            requestUserId: user.getId(),
            userId: user.getId(),
            currentPassword: "oldPassword123",
            newPassword: "newPassword456",
        };

        await changeUserPasswordUseCase.execute(request);

        const updatedUser = await userRepository.findById(user.getId());
        const passwordMatched = await bcrypt.compare(
            request.newPassword,
            updatedUser!.getPassword()
        );

        expect(passwordMatched).toBe(true);
    });

    it("should throw an error if the current password is incorrect", async () => {
        const hashedPassword = await bcrypt.hash("oldPassword123", 10);
        const user = makeUser({ password: hashedPassword });

        await userRepository.create(user);

        const request = {
            requestUserId: user.getId(),
            userId: user.getId(),
            currentPassword: "wrongPassword",
            newPassword: "newPassword456",
        };

        await expect(changeUserPasswordUseCase.execute(request)).rejects.toThrow(
            InvalidUserCredentialsError
        );
    });

    it("should throw an error if the request user is not authorized to change the password", async () => {
        const hashedPassword = await bcrypt.hash("oldPassword123", 10);
        const user = makeUser({ password: hashedPassword });
        const anotherUser = makeUser();

        await Promise.all([
            userRepository.create(user),
            userRepository.create(anotherUser),
        ]);

        const request = {
            requestUserId: anotherUser.getId(),
            userId: user.getId(),
            currentPassword: "oldPassword123",
            newPassword: "newPassword456",
        };

        await expect(changeUserPasswordUseCase.execute(request)).rejects.toThrow();
    });

});