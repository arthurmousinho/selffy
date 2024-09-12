import { UserRepository } from "@application/repositories/user.repository";
import { CreateUserUseCase } from "./create-user.usecase";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { User } from "@application/entities/user/user";
import { UserAlreadyExistsError } from "@application/errors/user/user-already-exists.error";
import { makeUser } from "@test/factories/user.factory";


describe('Create User UseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        createUserUseCase = new CreateUserUseCase(userRepository);
    });

    it('should throw an error if the user already exists', async () => {
        const newUser = makeUser();
        await createUserUseCase.execute(newUser);
        await expect(createUserUseCase.execute(newUser)).rejects.toThrow(UserAlreadyExistsError);
    });

    it('should create a new user if the user does not exist', async () => {
        const newUser = makeUser();
        await createUserUseCase.execute(newUser);
        const users = await userRepository.findAll();
        expect(users.length).toBe(1);
        expect(users[0].getEmail()).toBe(newUser.getEmail());
        expect(users[0].getName()).toBe(newUser.getName());
        expect(users[0].getPassword()).toBe(newUser.getPassword());
        expect(users[0].getRoles()).toEqual(newUser.getRoles());
    });

});