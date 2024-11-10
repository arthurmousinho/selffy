import { ProjectRepository } from "@application/repositories/project.repository";
import { CreateProjectUseCase } from "./create-project.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { makeUser } from "@test/factories/user.factory";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";

describe('CreateProjectUseCase', () => {
    
    let createProjectUseCase: CreateProjectUseCase;
    let projectRepository: ProjectRepository;
    let findUserByIdUseCase: FindUserByIdUseCase;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        findUserByIdUseCase = { execute: jest.fn() } as any;
        createProjectUseCase = new CreateProjectUseCase(projectRepository, findUserByIdUseCase);
    });

    it('should create a new project if the owner exists', async () => {
        const ownerUser = makeUser({ id: 'owner-id', role: 'FREE' });
        jest.spyOn(findUserByIdUseCase, 'execute').mockResolvedValue(ownerUser);

        const projectRequest = {
            title: 'New Project',
            description: 'Project Description',
            revenue: 1000,
            icon: 'icon-url',
            color: '#FFFFFF',
            ownerId: ownerUser.getId()
        };

        const result = await createProjectUseCase.execute(projectRequest);

        expect(result.getTitle()).toBe(projectRequest.title);
        expect(result.getDescription()).toBe(projectRequest.description);
        expect(result.getOwner()).toBe(ownerUser);
    });

    it('should throw UserNotFoundError if the owner does not exist', async () => {
        jest.spyOn(findUserByIdUseCase, 'execute').mockRejectedValue(new UserNotFoundError());

        const projectRequest = {
            title: 'New Project',
            description: 'Project Description',
            revenue: 1000,
            icon: 'icon-url',
            color: '#FFFFFF',
            ownerId: 'non-existent-id'
        };

        await expect(createProjectUseCase.execute(projectRequest)).rejects.toThrow(UserNotFoundError);
    });

});