import { ProjectRepository } from "@application/repositories/project.repository";
import { UpdateProjectUseCase } from "./update-project.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";
import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";

describe('Update Project UseCase', () => {
    
    let updateProjectUseCase: UpdateProjectUseCase;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        updateProjectUseCase = new UpdateProjectUseCase(projectRepository);
    });

    it('should throw an error if the project does not exist', async () => {
        const nonExistentProject = makeProject();  

        await expect(updateProjectUseCase.execute(nonExistentProject)).rejects.toThrow(ProjectNotFoundError);
    });

    it('should update the project if the project exists', async () => {
        const existingProject = makeProject();  
        await projectRepository.create(existingProject);  

        existingProject.setTitle('Updated Project Title');
        existingProject.setDescription('Updated project description');
        existingProject.setColor('newColor'); 
        existingProject.setIcon('newIcon'); 

        await updateProjectUseCase.execute(existingProject);

        const updatedProject = await projectRepository.findById(existingProject.getId());

        expect(updatedProject).not.toBeNull();
        if (updatedProject) {
            expect(updatedProject.getTitle()).toBe('Updated Project Title');
            expect(updatedProject.getDescription()).toBe('Updated project description');
            expect(updatedProject.getColor()).toBe('newColor'); 
            expect(updatedProject.getIcon()).toBe('newIcon'); 
            expect(updatedProject.getUpdatedAt()).toBeInstanceOf(Date); 
        }
    });

});