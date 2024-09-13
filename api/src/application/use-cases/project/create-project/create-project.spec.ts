import { ProjectRepository } from "@application/repositories/project.repository";
import { CreateProjectUseCase } from "./create-project.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";
import { ProjectAlreadyExistsError } from "@application/errors/project/project-already-exists.error";

describe('Create Project UseCase', () => {
    let createProjectUseCase: CreateProjectUseCase;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        createProjectUseCase = new CreateProjectUseCase(projectRepository);
    });

    it('should throw an error if the project already exists', async () => {
        const newProject = makeProject();
        await createProjectUseCase.execute(newProject);
        await expect(createProjectUseCase.execute(newProject)).rejects.toThrow(ProjectAlreadyExistsError);
    });

    it('should create a new project if the project does not exist', async () => {
        const newProject = makeProject();
        await createProjectUseCase.execute(newProject);
        const projects = await projectRepository.findAll();
        expect(projects.length).toBe(1);
        expect(projects[0].getId()).toBe(newProject.getId());
        expect(projects[0].getTitle()).toBe(newProject.getTitle());
        expect(projects[0].getDescription()).toBe(newProject.getDescription());
        expect(projects[0].getOwner()).toBe(newProject.getOwner());
    });

});
