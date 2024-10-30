import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { makeProject } from "@test/factories/project.factory";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { DeleteProjectUseCase } from "./delete-project.usecase";
import { ProjectRepository } from "@application/repositories/project.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { makeUser } from "@test/factories/user.factory";

describe('Delete Project UseCase', () => {

    let deleteProjectUseCase: DeleteProjectUseCase;
    let projectRepository: ProjectRepository;
    let findUserByIdUseCase: FindUserByIdUseCase;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        findUserByIdUseCase = { execute: jest.fn() } as any;
        deleteProjectUseCase = new DeleteProjectUseCase(projectRepository, findUserByIdUseCase);
    });

    it('should throw an error if the project does not exist', async () => {
        const nonExistentProjectId = 'non-existent-id';
        const requestUserId = 'some-user-id';

        await expect(deleteProjectUseCase.execute({ projectId: nonExistentProjectId, requestUserId })).rejects.toThrow(ProjectNotFoundError);
    });

    it('should delete the project if the user is an ADMIN', async () => {
        const adminUser = makeUser({ role: 'ADMIN' });
        const project = makeProject();
        await projectRepository.create(project);

        jest.spyOn(findUserByIdUseCase, 'execute').mockResolvedValue(adminUser);

        await deleteProjectUseCase.execute({ projectId: project.getId(), requestUserId: adminUser.getId() });

        const foundProject = await projectRepository.findById(project.getId());
        expect(foundProject).toBeFalsy();
    });

    it('should throw an error if the user is not the owner and not an ADMIN', async () => {
        const regularUser = makeUser({ role: 'FREE' });
        const projectOwner = makeUser({ role: 'FREE' });
        const project = makeProject({ owner: projectOwner });

        await projectRepository.create(project);
        jest.spyOn(findUserByIdUseCase, 'execute').mockResolvedValue(regularUser);

        await expect(deleteProjectUseCase.execute({ projectId: project.getId(), requestUserId: regularUser.getId() })).rejects.toThrow(UnauthorizedUserError);
    });

    it('should delete the project if the user is the owner', async () => {
        const projectOwner = makeUser({ role: 'FREE' });
        const project = makeProject({ owner: projectOwner });

        await projectRepository.create(project);
        jest.spyOn(findUserByIdUseCase, 'execute').mockResolvedValue(projectOwner);

        await deleteProjectUseCase.execute({ projectId: project.getId(), requestUserId: projectOwner.getId() });

        const foundProject = await projectRepository.findById(project.getId());
        expect(foundProject).toBeFalsy();
    });

});