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

        const pageableUsers = await userRepository.findAll(1,10);
        expect(pageableUsers.meta.total).toBe(1);
        expect(pageableUsers.data[0].getEmail()).toBe(user.getEmail());
        expect(pageableUsers.data[0].getName()).toBe(user.getName());
        expect(pageableUsers.data[0].getPassword()).toBe(user.getPassword());
        expect(pageableUsers.data[0].getRoles()).toEqual(user.getRoles());
        expect(pageableUsers.data[0].getType()).toBe(user.getType());
        expect(pageableUsers.data[0].getPlan()).toBe(user.getPlan());
    });

});
