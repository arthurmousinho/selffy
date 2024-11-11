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
        const user = makeUser({ role: 'ADMIN' });
        await userRepository.create(user);

        await expect(
            findProjectByIdUseCase.execute({
                requestUserId: user.getId(),
                projectId: 'non-existing-id'
            })
        ).rejects.toThrow(ProjectNotFoundError);
    });

    it('should throw UnauthorizedUserError if the user is neither admin nor owner of the project', async () => {
        const project = makeProject();
        await projectRepository.create(project);

        const unauthorizedUser = makeUser({ role: 'FREE' });
        await userRepository.create(unauthorizedUser);

        await expect(
            findProjectByIdUseCase.execute({
                requestUserId: unauthorizedUser.getId(),
                projectId: project.getId()
            })
        ).rejects.toThrow(UnauthorizedUserError);
    });

    it('should return the project if the user is the owner', async () => {
        const project = makeProject();
        await projectRepository.create(project);

        const ownerUser = makeUser({ id: project.getId(), role: 'FREE' });
        await userRepository.create(ownerUser);

        const foundProject = await findProjectByIdUseCase.execute({
            requestUserId: ownerUser.getId(),
            projectId: project.getId()
        });

        expect(foundProject.getId()).toBe(project.getId());
        expect(foundProject.getTitle()).toBe(project.getTitle());
        expect(foundProject.getTitle()).toBe(project.getTitle());
    });

    it('should return the project if the user is an admin', async () => {
        const project = makeProject();
        await projectRepository.create(project);

        const adminUser = makeUser({ role: 'ADMIN' });
        await userRepository.create(adminUser);

        const foundProject = await findProjectByIdUseCase.execute({
            requestUserId: adminUser.getId(),
            projectId: project.getId()
        });

        expect(foundProject).toBeDefined();
        expect(foundProject.getId()).toBe(project.getId());
        expect(foundProject.getTitle()).toBe(project.getTitle());
    });

});