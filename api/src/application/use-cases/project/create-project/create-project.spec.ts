import { ProjectRepository } from "@domain/repositories/project.repository";
import { CreateProjectUseCase } from "./create-project.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { makeUser } from "@test/factories/user.factory";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { MaximumProjectsExceededError } from "@application/errors/project/maximum-projects-exceeded.error";
import { UserRepository } from "@domain/repositories/user.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";

describe('CreateProjectUseCase', () => {

    let createProjectUseCase: CreateProjectUseCase;
    let projectRepository: ProjectRepository;

    let userRepository: UserRepository;
    let findUserByIdUseCase: FindUserByIdUseCase;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);

        projectRepository = new InMemoryProjectRepository();
        createProjectUseCase = new CreateProjectUseCase(projectRepository, findUserByIdUseCase);
    });

    it('should create a new project if the owner exists', async () => {
        const ownerUser = makeUser({ id: 'owner-id', role: 'FREE' });
        await userRepository.create(ownerUser);

        jest.spyOn(findUserByIdUseCase, 'execute').mockResolvedValueOnce(ownerUser);

        const projectRequest = {
            requestUserId: ownerUser.getId(),
            ownerId: ownerUser.getId(),
            title: 'New Project',
            description: 'Project Description',
            revenue: 1000,
            icon: 'icon-url',
            color: '#FFFFFF'
        };

        const result = await createProjectUseCase.execute(projectRequest);

        expect(result.getTitle()).toBe(projectRequest.title);
        expect(result.getDescription()).toBe(projectRequest.description);
        expect(result.getOwner()).toBe(ownerUser);
    });

    it('should throw UserNotFoundError if the owner does not exist', async () => {
        jest.spyOn(findUserByIdUseCase, 'execute').mockRejectedValueOnce(new UserNotFoundError());

        const projectRequest = {
            requestUserId: 'request-id',
            ownerId: 'non-existent-id',
            title: 'New Project',
            description: 'Project Description',
            revenue: 1000,
            icon: 'icon-url',
            color: '#FFFFFF'
        };

        await expect(createProjectUseCase.execute(projectRequest)).rejects.toThrow(UserNotFoundError);
    });

    it('should throw UserNotFoundError if the request user does not exist', async () => {
        const ownerUser = makeUser({ id: 'owner-id', role: 'FREE' });

        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockRejectedValueOnce(new UserNotFoundError()) // Simulate requestUser not found
            .mockResolvedValueOnce(ownerUser); // Simulate ownerUser exists

        const projectRequest = {
            requestUserId: 'non-existent-request-id',
            ownerId: ownerUser.getId(),
            title: 'New Project',
            description: 'Project Description',
            revenue: 1000,
            icon: 'icon-url',
            color: '#FFFFFF'
        };

        await expect(createProjectUseCase.execute(projectRequest)).rejects.toThrow(UserNotFoundError);
    });

    it('should allow ADMIN to create a project for another user', async () => {
        const adminUser = makeUser({ id: 'admin-id', role: 'ADMIN' });
        const otherUser = makeUser({ id: 'other-user-id', role: 'FREE' });
        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockResolvedValueOnce(adminUser)
            .mockResolvedValueOnce(otherUser);

        const projectRequest = {
            requestUserId: adminUser.getId(),
            ownerId: otherUser.getId(),
            title: 'Admin Project',
            description: 'Project Description',
            revenue: 2000,
            icon: 'icon-url',
            color: '#000000'
        };

        const result = await createProjectUseCase.execute(projectRequest);

        expect(result.getOwner()).toBe(otherUser);
    });

    it('should throw UnauthorizedUserError if non-admin tries to create project for another user', async () => {
        const user = makeUser({ id: 'user-id', role: 'FREE' });
        const otherUser = makeUser({ id: 'other-user-id', role: 'FREE' });
        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockResolvedValueOnce(user)
            .mockResolvedValueOnce(otherUser);

        const projectRequest = {
            requestUserId: user.getId(),
            ownerId: otherUser.getId(),
            title: 'Unauthorized Project',
            description: 'Project Description',
            revenue: 1500,
            icon: 'icon-url',
            color: '#FF0000'
        };

        await expect(createProjectUseCase.execute(projectRequest)).rejects.toThrow(UnauthorizedUserError);
    });

    it('should throw MaximumProjectsExceededError if FREE user exceeds project limit', async () => {
        const freeUser = makeUser({ id: 'free-user-id', role: 'FREE' });
        jest.spyOn(findUserByIdUseCase, 'execute').mockResolvedValue(freeUser);
        jest.spyOn(projectRepository, 'countByOwnerId').mockResolvedValue(5);

        const projectRequest = {
            requestUserId: freeUser.getId(),
            ownerId: freeUser.getId(),
            title: 'Excess Project',
            description: 'Exceeds limit for FREE user',
            revenue: 500,
            icon: 'icon-url',
            color: '#00FF00'
        };

        await expect(createProjectUseCase.execute(projectRequest)).rejects.toThrow(MaximumProjectsExceededError);
    });

    it('should allow PREMIUM user to create unlimited projects', async () => {
        const premiumUser = makeUser({ id: 'premium-user-id', role: 'PREMIUM' });
        jest.spyOn(findUserByIdUseCase, 'execute').mockResolvedValue(premiumUser);
        jest.spyOn(projectRepository, 'countByOwnerId').mockResolvedValue(100);

        const projectRequest = {
            requestUserId: premiumUser.getId(),
            ownerId: premiumUser.getId(),
            title: 'Premium Project',
            description: 'Project Description',
            revenue: 3000,
            icon: 'icon-url',
            color: '#0000FF'
        };

        const result = await createProjectUseCase.execute(projectRequest);

        expect(result.getOwner()).toBe(premiumUser);
    });

});