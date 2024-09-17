import { makeProject } from "@test/factories/project.factory";
import { FindAllProjectsUseCase } from "./find-all-projects.usecase";
import { ProjectRepository } from "@application/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";

describe('Find All Projects UseCase', () => {
    
    let findAllProjectsUseCase: FindAllProjectsUseCase;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        findAllProjectsUseCase = new FindAllProjectsUseCase(projectRepository);
    });

    it('should return an empty list if no projects exist', async () => {
        const projects = await findAllProjectsUseCase.execute();

        expect(projects).toEqual([]);
    });

    it('should return all projects if they exist', async () => {
        const project1 = makeProject({ title: 'Project 1', description: 'First project' });
        const project2 = makeProject({ title: 'Project 2', description: 'Second project' });

        await projectRepository.create(project1);
        await projectRepository.create(project2);

        const projects = await findAllProjectsUseCase.execute();

        expect(projects.length).toBe(2);
        expect(projects).toContainEqual(project1);
        expect(projects).toContainEqual(project2);
    });

});