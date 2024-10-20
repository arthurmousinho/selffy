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
        const result = await findAllProjectsUseCase.execute(1, 10);

        expect(result.data).toEqual([]);
        expect(result.meta.total).toBe(0);
        expect(result.meta.page).toBe(1);
        expect(result.meta.totalPages).toBe(0);
    });

    it('should return all projects if they exist', async () => {
        const project1 = makeProject({ title: 'Project 1', description: 'First project' });
        const project2 = makeProject({ title: 'Project 2', description: 'Second project' });

        await projectRepository.create(project1);
        await projectRepository.create(project2);

        const result = await findAllProjectsUseCase.execute(1, 10);

        expect(result.meta.total).toBe(2);
        expect(result.data).toContainEqual(project1);
        expect(result.data).toContainEqual(project2);
    });

    it('should return paginated results', async () => {
        const project1 = makeProject({ title: 'Project 1' });
        const project2 = makeProject({ title: 'Project 2' });
        const project3 = makeProject({ title: 'Project 3' });

        await projectRepository.create(project1);
        await projectRepository.create(project2);
        await projectRepository.create(project3);

        const result = await findAllProjectsUseCase.execute(1, 2); 

        expect(result.meta.total).toBe(3);
        expect(result.meta.page).toBe(1);
        expect(result.meta.totalPages).toBe(2);
        expect(result.data.length).toBe(2); 
    });

});
