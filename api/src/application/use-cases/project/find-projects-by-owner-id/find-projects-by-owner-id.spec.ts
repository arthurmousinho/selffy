import { FindProjectsByOwnerIdUseCase } from "./find-projects-by-owner-id.usecase";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { makeUser } from "@test/factories/user.factory";
import { makeProject } from "@test/factories/project.factory";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";

describe('FindProjectsByOwnerId UseCase', () => {

    let findProjectsByOwnerIdUseCase: FindProjectsByOwnerIdUseCase;
    let projectRepository: ProjectRepository;
    let findUserByIdUseCase: FindUserByIdUseCase;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        findUserByIdUseCase = { execute: jest.fn() } as any;
        findProjectsByOwnerIdUseCase = new FindProjectsByOwnerIdUseCase(
            projectRepository,
            findUserByIdUseCase
        );
    });

    it('should return a list of projects for a given ownerId', async () => {
        const owner = makeUser({ id: 'existing-owner-id', role: 'FREE' });
        const requestUser = makeUser({ id: 'existing-owner-id', role: 'FREE' });

        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockResolvedValueOnce(requestUser)
            .mockResolvedValueOnce(owner);

        const project1 = makeProject({ owner });
        const project2 = makeProject({ owner });
        await projectRepository.create(project1);
        await projectRepository.create(project2);

        const pageableProjects = await findProjectsByOwnerIdUseCase.execute({
            ownerId: owner.getId(),
            requestUserId: requestUser.getId(),
            page: 1,
            limit: 10,
        });

        expect(pageableProjects).toBeDefined();
        expect(pageableProjects.data.length).toBe(2);
        expect(pageableProjects.data[0].getOwner().getId()).toBe(owner.getId());
        expect(pageableProjects.data[1].getOwner().getId()).toBe(owner.getId());
    });

    it('should return an empty list if the owner has no projects', async () => {
        const owner = makeUser({ id: 'owner-with-no-projects', role: 'FREE' });
        const requestUser = makeUser({ id: 'owner-with-no-projects', role: 'FREE' });

        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockResolvedValueOnce(requestUser)
            .mockResolvedValueOnce(owner);

        const pageableProjects = await findProjectsByOwnerIdUseCase.execute({
            ownerId: owner.getId(),
            requestUserId: requestUser.getId(),
            page: 1,
            limit: 10,
        });

        expect(pageableProjects).toBeDefined();
        expect(pageableProjects.data.length).toBe(0);
    });

    it('should throw UnauthorizedUserError if a non-admin tries to access another user\'s projects', async () => {
        const owner = makeUser({ id: 'owner-id', role: 'FREE' });
        const requestUser = makeUser({ id: 'unauthorized-user-id', role: 'FREE' });

        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockResolvedValueOnce(requestUser)
            .mockResolvedValueOnce(owner);

        await expect(findProjectsByOwnerIdUseCase.execute({
            ownerId: owner.getId(),
            requestUserId: requestUser.getId(),
            page: 1,
            limit: 10,
        })).rejects.toThrow(UnauthorizedUserError);
    });

    it('should allow an ADMIN to access any user\'s projects', async () => {
        const owner = makeUser({ id: 'owner-id', role: 'FREE' });
        const adminUser = makeUser({ id: 'admin-id', role: 'ADMIN' });

        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockResolvedValueOnce(adminUser)
            .mockResolvedValueOnce(owner);

        const project = makeProject({ owner });
        await projectRepository.create(project);

        const pageableProjects = await findProjectsByOwnerIdUseCase.execute({
            ownerId: owner.getId(),
            requestUserId: adminUser.getId(),
            page: 1,
            limit: 10,
        });

        expect(pageableProjects).toBeDefined();
        expect(pageableProjects.data.length).toBe(1);
        expect(pageableProjects.data[0].getOwner().getId()).toBe(owner.getId());
    });

    it('should throw UserNotFoundError if the request user does not exist', async () => {
        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockRejectedValueOnce(new UserNotFoundError());

        await expect(findProjectsByOwnerIdUseCase.execute({
            ownerId: 'some-owner-id',
            requestUserId: 'non-existent-user-id',
            page: 1,
            limit: 10,
        })).rejects.toThrow(UserNotFoundError);
    });

    it('should throw UserNotFoundError if the owner does not exist', async () => {
        const requestUser = makeUser({ id: 'request-user-id', role: 'FREE' });

        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockResolvedValueOnce(requestUser)
            .mockRejectedValueOnce(new UserNotFoundError());

        await expect(findProjectsByOwnerIdUseCase.execute({
            ownerId: 'non-existent-owner-id',
            requestUserId: requestUser.getId(),
            page: 1,
            limit: 10,
        })).rejects.toThrow(UserNotFoundError);
    });

    it('should respect pagination parameters', async () => {
        const owner = makeUser({ id: 'owner-id', role: 'FREE' });
        const requestUser = makeUser({ id: 'owner-id', role: 'FREE' });

        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockResolvedValueOnce(requestUser)
            .mockResolvedValueOnce(owner);

        // Criar 15 projetos para testar a paginação
        for (let i = 0; i < 15; i++) {
            const project = makeProject({ owner });
            await projectRepository.create(project);
        }

        const pageableProjects = await findProjectsByOwnerIdUseCase.execute({
            ownerId: owner.getId(),
            requestUserId: requestUser.getId(),
            page: 1,
            limit: 10,
        });

        expect(pageableProjects).toBeDefined();
        expect(pageableProjects.data.length).toBe(10);
    });

});