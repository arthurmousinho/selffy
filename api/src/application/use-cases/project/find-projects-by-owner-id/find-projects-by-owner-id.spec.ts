import { makeProject } from "@test/factories/project.factory";
import { FindProjectsByOwnerIdUseCase } from "./find-projects-by-owner-id.usecase";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeUser } from "@test/factories/user.factory";

describe('FindProjectsByOwnerId UseCase', () => {

    let findProjectsByOwnerIdUseCase: FindProjectsByOwnerIdUseCase;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        findProjectsByOwnerIdUseCase = new FindProjectsByOwnerIdUseCase(projectRepository);
    });

    it('should return a list of projects for a given ownerId', async () => {
        const owner = makeUser({ id: 'existing-owner-id' });

        const project1 = makeProject({ owner });
        const project2 = makeProject({ owner });
        await projectRepository.create(project1);
        await projectRepository.create(project2);

        const pageableProjects = await findProjectsByOwnerIdUseCase.execute({
            ownerId: owner.getId(),
            page: 1,
            limit: 10,
        });

        expect(pageableProjects).toBeDefined();
        expect(pageableProjects.data.length).toBe(2);
        expect(pageableProjects.data[0].getOwner().getId()).toBe(owner.getId());
        expect(pageableProjects.data[1].getOwner().getId()).toBe(owner.getId());
    });

    it('should return an empty list if the owner has no projects', async () => {
        const ownerId = 'owner-with-no-projects';
        const pageableProjects = await findProjectsByOwnerIdUseCase.execute({
            ownerId,
            page: 1,
            limit: 10,
        });

        expect(pageableProjects).toBeDefined();
        expect(pageableProjects.data.length).toBe(0);
    });

});