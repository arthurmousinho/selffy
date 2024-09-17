import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";
import { makeProject } from "@test/factories/project.factory";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { DeleteProjectUseCase } from "./delete-project.usecase";
import { ProjectRepository } from "@application/repositories/project.repository";

describe('Delete Project UseCase', () => {
    
    let deleteProjectUseCase: DeleteProjectUseCase;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        deleteProjectUseCase = new DeleteProjectUseCase(projectRepository);
    });

    it('should throw an error if the project does not exist', async () => {
        const nonExistentProject = makeProject(); 

        await expect(deleteProjectUseCase.execute(nonExistentProject)).rejects.toThrow(ProjectNotFoundError);
    });

    it('should delete the project if the project exists', async () => {
        const existingProject = makeProject();  
        await projectRepository.create(existingProject);  

        await deleteProjectUseCase.execute(existingProject);

        const foundProject = await projectRepository.findById(existingProject.getId());
        expect(foundProject).toBeFalsy();
    });

});