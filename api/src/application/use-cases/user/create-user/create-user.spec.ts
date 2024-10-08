import { UserRepository } from "@application/repositories/user.repository";
import { CreateUserUseCase } from "./create-user.usecase";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { UserAlreadyExistsError } from "@application/errors/user/user-already-exists.error";
import { makeUser } from "@test/factories/user.factory";
import { GetRolesForUserTypeUseCase } from "@application/use-cases/role/get-roles-for-user-type/get-roles-for-user-type";
import { InMemoryRoleRepository } from "@test/repositories/in-memory-role.repository";

describe('Create User UseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let userRepository: UserRepository;
    let rolesRepository: InMemoryRoleRepository;
    let getRolesForUserTypeUseCase: GetRolesForUserTypeUseCase;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        rolesRepository = new InMemoryRoleRepository();

        getRolesForUserTypeUseCase = new GetRolesForUserTypeUseCase(rolesRepository)
        createUserUseCase = new CreateUserUseCase(userRepository, getRolesForUserTypeUseCase);
    });

    it('should throw an error if the user already exists', async () => {
        const newUser = makeUser();
        await createUserUseCase.execute({
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            type: "DEFAULT",
            plan: "FREE"
        });

        await expect(createUserUseCase.execute({
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            type: "DEFAULT",
            plan: "FREE"
        })).rejects.toThrow(UserAlreadyExistsError);
    });

    it('should create a new user if the user does not exist', async () => {
        const newUser = makeUser();
        const { user } = await createUserUseCase.execute({
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            type: "DEFAULT",
            plan: "FREE"
        });

        const users = await userRepository.findAll();
        expect(users.length).toBe(1);
        expect(users[0].getEmail()).toBe(user.getEmail());
        expect(users[0].getName()).toBe(user.getName());
        expect(users[0].getPassword()).toBe(user.getPassword());
        expect(users[0].getRoles()).toEqual(user.getRoles());
        expect(users[0].getType()).toBe(user.getType());
        expect(users[0].getPlan()).toBe(user.getPlan());
    });

});
