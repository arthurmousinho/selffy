import { PinProjectUseCase } from "./pin-project.usecase";
import { FindProjectByIdUseCase } from "../find-project-by-id/find-project-by-id.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { makeUser } from "@test/factories/user.factory";
import { makeProject } from "@test/factories/project.factory";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { UserRepository } from "@domain/repositories/user.repository";

describe('PinProjectUseCase', () => {
    let pinProjectUseCase: PinProjectUseCase;
    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let findUserByIdUseCase: FindUserByIdUseCase;

    let projectRepository: ProjectRepository;
    let userRepository: UserRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        userRepository = new InMemoryUserRepository();

        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository, findUserByIdUseCase);
        pinProjectUseCase = new PinProjectUseCase(projectRepository, findProjectByIdUseCase);
    });

    it('should pin a project successfully', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const project = makeProject({ owner, isPinned: false });
        await projectRepository.create(project);

        await pinProjectUseCase.execute({
            projectId: project.getId(),
            requestUserId: owner.getId(),
        });

        const updatedProject = await projectRepository.findById(project.getId());
        expect(updatedProject?.getIsPinned()).toBe(true);
    });

    it('should throw UnauthorizedUserError if the user is not allowed to pin the project', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const unauthorizedUser = makeUser();
        await userRepository.create(unauthorizedUser);

        const project = makeProject({ owner, isPinned: false });
        await projectRepository.create(project);

        await expect(
            pinProjectUseCase.execute({
                projectId: project.getId(),
                requestUserId: unauthorizedUser.getId(),
            }),
        ).rejects.toThrow(UnauthorizedUserError);
    });

    it('should throw ProjectNotFoundError if the project does not exist', async () => {
        const user = makeUser();
        await userRepository.create(user);

        await expect(
            pinProjectUseCase.execute({
                projectId: 'non-existent-project-id',
                requestUserId: user.getId(),
            }),
        ).rejects.toThrow(ProjectNotFoundError);
    });

});