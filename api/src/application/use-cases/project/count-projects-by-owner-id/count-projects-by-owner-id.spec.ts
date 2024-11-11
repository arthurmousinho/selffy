import { ProjectRepository } from "@domain/repositories/project.repository";
import { CountProjectsByOwnerIdUseCase } from "./count-projects-by-owner-id.usecase";

describe('CountProjectsByOwnerIdUseCase', () => {
    let countProjectsByOwnerIdUseCase: CountProjectsByOwnerIdUseCase;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        projectRepository = {
            countByOwnerId: jest.fn(),
        } as any;

        countProjectsByOwnerIdUseCase = new CountProjectsByOwnerIdUseCase(projectRepository);
    });

    it('should return the correct project count for the given ownerId', async () => {
        const ownerId = 'owner-id';
        const expectedCount = 5;

        (projectRepository.countByOwnerId as jest.Mock).mockResolvedValue(expectedCount);
        const count = await countProjectsByOwnerIdUseCase.execute(ownerId);

        expect(count).toBe(expectedCount);
        expect(projectRepository.countByOwnerId).toHaveBeenCalledWith(ownerId);
    });

    it('should return 0 if no projects are found for the given ownerId', async () => {
        const ownerId = 'owner-id';
        const expectedCount = 0;

        (projectRepository.countByOwnerId as jest.Mock).mockResolvedValue(expectedCount);
        const count = await countProjectsByOwnerIdUseCase.execute(ownerId);

        expect(count).toBe(expectedCount);
        expect(projectRepository.countByOwnerId).toHaveBeenCalledWith(ownerId);
    });

});