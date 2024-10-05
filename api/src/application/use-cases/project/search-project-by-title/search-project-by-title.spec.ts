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
    const projects = await searchProjectsByTitleUseCase.execute('Non-existent title');
    expect(projects).toEqual([]);
  });

  it('should return projects that match the title', async () => {
    const project1 = makeProject({ title: 'First Project', description: 'First description' });
    const project2 = makeProject({ title: 'Second Project', description: 'Second description' });

    await projectRepository.create(project1);
    await projectRepository.create(project2);

    const projects = await searchProjectsByTitleUseCase.execute('First Project');

    expect(projects.length).toBe(1);
    expect(projects).toContainEqual(project1);
  });

  it('should return multiple projects if more than one match the title', async () => {
    const project1 = makeProject({ title: 'Project Alpha' });
    const project2 = makeProject({ title: 'Project Beta' });
    const project3 = makeProject({ title: 'Project Alpha Beta' });

    await projectRepository.create(project1);
    await projectRepository.create(project2);
    await projectRepository.create(project3);

    const projects = await searchProjectsByTitleUseCase.execute('Project Alpha');

    expect(projects.length).toBe(2);
    expect(projects).toContainEqual(project1);
    expect(projects).toContainEqual(project3);
  });

});