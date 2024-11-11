import { UserRepository } from "@domain/repositories/user.repository";
import { CreateUserUseCase } from "./create-user.usecase";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { UserAlreadyExistsError } from "@application/errors/user/user-already-exists.error";
import { makeUser } from "@test/factories/user.factory";
import * as bcrypt from 'bcryptjs';

describe('Create User UseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        createUserUseCase = new CreateUserUseCase(userRepository);
    });

    it('should throw an error if the user already exists', async () => {
        const existingUser = makeUser();
        await userRepository.create(existingUser);

        await expect(createUserUseCase.execute({
            name: existingUser.getName(),
            email: existingUser.getEmail(),
            password: existingUser.getPassword(),
            role: "FREE"
        })).rejects.toThrow(UserAlreadyExistsError);
    });

    it('should create a new user if the user does not exist', async () => {
        const newUser = makeUser();
        const { user } = await createUserUseCase.execute({
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: "FREE"
        });

        const pageableUsers = await userRepository.findAll(1, 10);
        expect(pageableUsers.meta.total).toBe(1);
        expect(pageableUsers.data[0].getEmail()).toBe(user.getEmail());
        expect(pageableUsers.data[0].getName()).toBe(user.getName());
        expect(pageableUsers.data[0].getPassword()).toBe(user.getPassword());
        expect(pageableUsers.data[0].getRole()).toEqual(user.getRole());
    });

    it('should store the password as a hash', async () => {
        const password = 'plaintextpassword';
        const { user } = await createUserUseCase.execute({
            name: 'New User',
            email: 'newuser@example.com',
            password,
            role: 'FREE'
        });

        const isPasswordHashed = await bcrypt.compare(password, user.getPassword());
        expect(isPasswordHashed).toBe(true);
    });

});