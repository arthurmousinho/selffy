import { FindProjectsByStatusUseCase } from './find-projects-by-status.usecase';
import { ProjectRepository } from '@application/repositories/project.repository';
import { InMemoryProjectRepository } from '@test/repositories/in-memory-project.repository';
import { makeProject } from '@test/factories/project.factory';

describe('FindProjectsByStatusUseCase', () => {
    let findProjectsByStatusUseCase: FindProjectsByStatusUseCase;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        findProjectsByStatusUseCase = new FindProjectsByStatusUseCase(projectRepository);
    });

    it('should return projects with the specified status', async () => {
        const inProgressProject = makeProject({ 
            title: 'In Progress Project',
            status: 'IN_PROGRESS'
        });

        const finishedProject = makeProject({ 
            title: 'Finished Project' ,
            status: 'FINISHED'
        });

        await projectRepository.create(inProgressProject);
        await projectRepository.create(finishedProject);

        const inProgressProjects = await findProjectsByStatusUseCase.execute('IN_PROGRESS');
        expect(inProgressProjects.length).toBe(1);
        expect(inProgressProjects[0].getTitle()).toBe('In Progress Project');

        const finishedProjects = await findProjectsByStatusUseCase.execute('FINISHED');
        expect(finishedProjects.length).toBe(1);
        expect(finishedProjects[0].getTitle()).toBe('Finished Project');
    });

    it('should return an empty array if no projects have the specified status', async () => {
        const inProgressProjects = await findProjectsByStatusUseCase.execute('IN_PROGRESS');
        expect(inProgressProjects.length).toBe(0);
    });

});