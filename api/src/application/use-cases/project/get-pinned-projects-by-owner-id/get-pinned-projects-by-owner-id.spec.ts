import { GetPinnedProjectsByOwnerIdUseCase } from "./get-pinned-projects-by-owner-id.usecase";
import { FindProjectsByOwnerIdUseCase } from "../find-projects-by-owner-id/find-projects-by-owner-id.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { makeUser } from "@test/factories/user.factory";
import { makeProject } from "@test/factories/project.factory";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { UserRepository } from "@domain/repositories/user.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";

describe('GetPinnedProjectsByOwnerIdUseCase', () => {
    let getPinnedProjectsByOwnerIdUseCase: GetPinnedProjectsByOwnerIdUseCase;
    let findProjectsByOwnerIdUseCase: FindProjectsByOwnerIdUseCase;
    let findUserByIdUseCase: FindUserByIdUseCase;

    let projectRepository: ProjectRepository;
    let userRepository: UserRepository;

    beforeAll(() => {
        projectRepository = new InMemoryProjectRepository();
        userRepository = new InMemoryUserRepository();

        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        findProjectsByOwnerIdUseCase = new FindProjectsByOwnerIdUseCase(projectRepository, findUserByIdUseCase);
        getPinnedProjectsByOwnerIdUseCase = new GetPinnedProjectsByOwnerIdUseCase(findProjectsByOwnerIdUseCase);
    });

    it('should return only pinned projects for the given owner ID', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const pinnedProject = makeProject({ owner, isPinned: true });
        const unpinnedProject = makeProject({ owner, isPinned: false });

        await projectRepository.create(pinnedProject);
        await projectRepository.create(unpinnedProject);

        const result = await getPinnedProjectsByOwnerIdUseCase.execute({
            ownerId: owner.getId(),
            requestUserId: owner.getId(),
        });

        expect(result.length).toBe(1);
        expect(result[0].getId()).toBe(pinnedProject.getId());
        expect(result[0].getIsPinned()).toBe(true);
    });

    it('should return an empty array if no pinned projects exist', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const unpinnedProject1 = makeProject({ owner, isPinned: false });
        const unpinnedProject2 = makeProject({ owner, isPinned: false });

        await projectRepository.create(unpinnedProject1);
        await projectRepository.create(unpinnedProject2);

        const result = await getPinnedProjectsByOwnerIdUseCase.execute({
            ownerId: owner.getId(),
            requestUserId: owner.getId(),
        });

        expect(result.length).toBe(0);
    });

    it('should throw an error if the user does not have permission to access the projects', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const unauthorizedUser = makeUser();
        await userRepository.create(unauthorizedUser);

        const project = makeProject({ owner, isPinned: true });
        await projectRepository.create(project);

        await expect(
            getPinnedProjectsByOwnerIdUseCase.execute({
                ownerId: owner.getId(),
                requestUserId: unauthorizedUser.getId(),
            }),
        ).rejects.toThrowError(); 
    });

});