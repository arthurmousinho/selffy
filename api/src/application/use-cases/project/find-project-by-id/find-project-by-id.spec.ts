import { makeProject } from "@test/factories/project.factory";
import { makeUser } from "@test/factories/user.factory";
import { FindProjectByIdUseCase } from "./find-project-by-id.usecase";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";

describe('FindProjectById UseCase', () => {

    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let projectRepository: ProjectRepository;
    let userRepository: InMemoryUserRepository;
    let findUserByIdUseCase: FindUserByIdUseCase;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        userRepository = new InMemoryUserRepository();
        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository, findUserByIdUseCase);
    });

    it('should throw ProjectNotFoundError if the project does not exist', async () => {
        const adminUser = makeUser({ role: 'ADMIN' });
        await userRepository.create(adminUser);

        await expect(
            findProjectByIdUseCase.execute({
                requestUserId: adminUser.getId(),
                projectId: 'non-existing-id'
            })
        ).rejects.toThrow(ProjectNotFoundError);
    });

    it('should throw UnauthorizedUserError if the user is neither admin nor owner of the project', async () => {
        const ownerUser = makeUser();
        const unauthorizedUser = makeUser({ role: 'FREE' });
        
        await userRepository.create(ownerUser);
        await userRepository.create(unauthorizedUser);

        const project = makeProject({ owner: ownerUser });
        await projectRepository.create(project);

        await expect(
            findProjectByIdUseCase.execute({
                requestUserId: unauthorizedUser.getId(),
                projectId: project.getId()
            })
        ).rejects.toThrow(UnauthorizedUserError);
    });

    it('should return the project if the user is the owner', async () => {
        const ownerUser = makeUser();
        await userRepository.create(ownerUser);

        const project = makeProject({ owner: ownerUser });
        await projectRepository.create(project);

        const foundProject = await findProjectByIdUseCase.execute({
            requestUserId: ownerUser.getId(),
            projectId: project.getId()
        });

        expect(foundProject).toBeDefined();
        expect(foundProject.getId()).toBe(project.getId());
        expect(foundProject.getTitle()).toBe(project.getTitle());
        expect(foundProject.getDescription()).toBe(project.getDescription());
    });

    it('should return the project if the user is an admin', async () => {
        const adminUser = makeUser({ role: 'ADMIN' });
        const ownerUser = makeUser();

        await userRepository.create(adminUser);
        await userRepository.create(ownerUser);

        const project = makeProject({ owner: ownerUser });
        await projectRepository.create(project);

        const foundProject = await findProjectByIdUseCase.execute({
            requestUserId: adminUser.getId(),
            projectId: project.getId()
        });

        expect(foundProject).toBeDefined();
        expect(foundProject.getId()).toBe(project.getId());
        expect(foundProject.getTitle()).toBe(project.getTitle());
    });

    it('should throw ProjectNotFoundError if the project ID is invalid', async () => {
        const user = makeUser({ role: 'FREE' });
        await userRepository.create(user);

        await expect(
            findProjectByIdUseCase.execute({
                requestUserId: user.getId(),
                projectId: 'invalid-id'
            })
        ).rejects.toThrow(ProjectNotFoundError);
    });

    it('should ensure the user is authorized based on role and ownership', async () => {
        const adminUser = makeUser({ role: 'ADMIN' });
        const ownerUser = makeUser();
        const otherUser = makeUser({ role: 'FREE' });

        await userRepository.create(adminUser);
        await userRepository.create(ownerUser);
        await userRepository.create(otherUser);

        const project = makeProject({ owner: ownerUser });
        await projectRepository.create(project);

        const projectByOwner = await findProjectByIdUseCase.execute({
            requestUserId: ownerUser.getId(),
            projectId: project.getId()
        });

        const projectByAdmin = await findProjectByIdUseCase.execute({
            requestUserId: adminUser.getId(),
            projectId: project.getId()
        });

        expect(projectByOwner.getId()).toBe(project.getId());
        expect(projectByAdmin.getId()).toBe(project.getId());

        await expect(
            findProjectByIdUseCase.execute({
                requestUserId: otherUser.getId(),
                projectId: project.getId()
            })
        ).rejects.toThrow(UnauthorizedUserError);
    });

});