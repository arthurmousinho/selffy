import { ProjectRepository } from '@domain/repositories/project.repository';
import { CountProjectsUseCase } from './count-projects.usecase';

describe('CountUsersUseCase', () => {
  let projectRepository: ProjectRepository;
  let countProjectsUseCase: CountProjectsUseCase;

  beforeEach(() => {
    projectRepository = {
      count: jest.fn(),
    } as unknown as ProjectRepository;
    countProjectsUseCase = new CountProjectsUseCase(projectRepository);
  });

  it('should return the number of projects', async () => {
    const userCount = 10;
    (projectRepository.count as jest.Mock).mockResolvedValue(userCount);
    const result = await countProjectsUseCase.execute();

    expect(projectRepository.count).toHaveBeenCalled();
    expect(result).toBe(userCount);
  });

  it('should handle errors thrown by the projectRepository', async () => {
    const errorMessage = 'Error counting users';
    (projectRepository.count as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(countProjectsUseCase.execute()).rejects.toThrow(errorMessage);
  });

});