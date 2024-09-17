import { makeProject } from "@test/factories/project.factory";
import { FindProjectByIdUseCase } from "./find-project-by-id.usecase";
import { ProjectRepository } from "@application/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";

describe('FindProjectById UseCase', () => {
    
    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository);
    });

    it('should throw an error if the project does not exist', async () => {
        await expect(findProjectByIdUseCase.execute('non-existing-id')).rejects.toThrow(ProjectNotFoundError);
    });

    it('should return the project if it exists', async () => {
        const project = makeProject();
        await projectRepository.create(project);

        const foundProject = await findProjectByIdUseCase.execute(project.getId());

        expect(foundProject).toBeDefined();
        expect(foundProject.getId()).toBe(project.getId());
        expect(foundProject.getTitle()).toBe(project.getTitle());
    });

});