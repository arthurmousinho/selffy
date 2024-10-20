import { ProjectRepository } from '@application/repositories/project.repository';
import { InMemoryProjectRepository } from '@test/repositories/in-memory-project.repository';
import { makeProject } from '@test/factories/project.factory';
import { SearchProjectByTitleUseCase } from './search-project-by-title.usecase';

describe('SearchProjectsByTitleUseCase', () => {

  let searchProjectsByTitleUseCase: SearchProjectByTitleUseCase;
  let projectRepository: ProjectRepository;

  beforeEach(() => {
    projectRepository = new InMemoryProjectRepository();
    searchProjectsByTitleUseCase = new SearchProjectByTitleUseCase(projectRepository);
  });

  it('should return an empty list if no projects match the title', async () => {
    const result = await searchProjectsByTitleUseCase.execute({ title: 'Non-existent title', page: 1, limit: 10 });

    expect(result.data).toEqual([]);
    expect(result.meta.total).toBe(0);
    expect(result.meta.page).toBe(1);
    expect(result.meta.totalPages).toBe(0);
  });

  it('should return projects that match the title', async () => {
    const project1 = makeProject({ title: 'First Project', description: 'First description' });
    const project2 = makeProject({ title: 'Second Project', description: 'Second description' });

    await projectRepository.create(project1);
    await projectRepository.create(project2);

    const result = await searchProjectsByTitleUseCase.execute({ title: 'First Project', page: 1, limit: 10 });

    expect(result.data.length).toBe(1);
    expect(result.data).toContainEqual(project1);
    expect(result.meta.total).toBe(1);
    expect(result.meta.page).toBe(1);
    expect(result.meta.totalPages).toBe(1);
  });

  it('should return multiple projects if more than one match the title', async () => {
    const project1 = makeProject({ title: 'Project Alpha' });
    const project2 = makeProject({ title: 'Project Beta' });
    const project3 = makeProject({ title: 'Project Alpha Beta' });

    await projectRepository.create(project1);
    await projectRepository.create(project2);
    await projectRepository.create(project3);

    const result = await searchProjectsByTitleUseCase.execute({ title: 'Project Alpha', page: 1, limit: 10 });

    expect(result.data.length).toBe(2);
    expect(result.data).toContainEqual(project1);
    expect(result.data).toContainEqual(project3);
    expect(result.meta.total).toBe(2);
    expect(result.meta.page).toBe(1);
    expect(result.meta.totalPages).toBe(1);
  });

});