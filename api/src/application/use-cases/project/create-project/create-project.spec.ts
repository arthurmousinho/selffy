import { ProjectRepository } from "@application/repositories/project.repository";
import { CreateProjectUseCase } from "./create-project.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { makeProject } from "@test/factories/project.factory";
import { makeUser } from "@test/factories/user.factory";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";

describe('CreateProjectUseCase', () => {
    let createProjectUseCase: CreateProjectUseCase;
    let projectRepository: ProjectRepository;
    let findUserByIdUseCase: FindUserByIdUseCase;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        findUserByIdUseCase = { execute: jest.fn() } as any;
        createProjectUseCase = new CreateProjectUseCase(projectRepository, findUserByIdUseCase);
    });

    it('should create a new project if the user is the owner or ADMIN', async () => {
        const ownerUser = makeUser({ id: 'owner-id', role: 'FREE' });
        const adminUser = makeUser({ id: 'admin-id', role: 'ADMIN' });
        const newProject = makeProject({ owner: ownerUser });

        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockResolvedValueOnce(ownerUser)
            .mockResolvedValueOnce(adminUser);

        const projectRequest = {
            title: newProject.getTitle(),
            description: newProject.getDescription(),
            revenue: newProject.getRevenue(),
            icon: newProject.getIcon(),
            color: newProject.getColor(),
            ownerId: ownerUser.getId(),
            requestUserId: adminUser.getId()
        };

        const result = await createProjectUseCase.execute(projectRequest);

        const allProjects = await projectRepository.findAll(1, 10);
        expect(allProjects.data.length).toBe(1);
        expect(allProjects.data[0].getTitle()).toBe(projectRequest.title);
        expect(allProjects.data[0].getDescription()).toBe(projectRequest.description);
        expect(allProjects.data[0].getOwner()).toBe(ownerUser);
    });

    it('should throw UnauthorizedUserError if the user is not the owner and not an ADMIN', async () => {
        const ownerUser = makeUser({ id: 'owner-id', role: 'FREE' });
        const nonOwnerUser = makeUser({ id: 'non-owner-id', role: 'FREE' });
        const newProject = makeProject({ owner: ownerUser });

        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockResolvedValueOnce(ownerUser)
            .mockResolvedValueOnce(nonOwnerUser);

        const projectRequest = {
            title: newProject.getTitle(),
            description: newProject.getDescription(),
            revenue: newProject.getRevenue(),
            icon: newProject.getIcon(),
            color: newProject.getColor(),
            ownerId: ownerUser.getId(),
            requestUserId: nonOwnerUser.getId()
        };

        await expect(createProjectUseCase.execute(projectRequest)).rejects.toThrow(UnauthorizedUserError);
    });

    it('should create a new project if the user is the owner', async () => {
        const ownerUser = makeUser({ id: 'owner-id', role: 'FREE' });
        const newProject = makeProject({ owner: ownerUser });

        jest.spyOn(findUserByIdUseCase, 'execute')
            .mockResolvedValueOnce(ownerUser)
            .mockResolvedValueOnce(ownerUser);

        const projectRequest = {
            title: newProject.getTitle(),
            description: newProject.getDescription(),
            revenue: newProject.getRevenue(),
            icon: newProject.getIcon(),
            color: newProject.getColor(),
            ownerId: ownerUser.getId(),
            requestUserId: ownerUser.getId()
        };

        await createProjectUseCase.execute(projectRequest);

        const allProjects = await projectRepository.findAll(1, 10);
        expect(allProjects.data.length).toBe(1);
        expect(allProjects.data[0].getTitle()).toBe(projectRequest.title);
        expect(allProjects.data[0].getDescription()).toBe(projectRequest.description);
        expect(allProjects.data[0].getOwner()).toBe(ownerUser);
    });

});