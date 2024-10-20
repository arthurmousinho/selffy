import { ProjectRepository } from "@application/repositories/project.repository";
import { CreateProjectUseCase } from "./create-project.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";

describe('Create Project UseCase', () => {
    let createProjectUseCase: CreateProjectUseCase;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        createProjectUseCase = new CreateProjectUseCase(projectRepository);
    });

    it('should create a new project', async () => {
        const newProject = makeProject();
        const projectRequest = {
            title: newProject.getTitle(),
            description: newProject.getDescription(),
            revenue: newProject.getRevenue(),
            icon: newProject.getIcon(),
            color: newProject.getColor(),
            owner: newProject.getOwner(),
        };

        await createProjectUseCase.execute(projectRequest);

        const result = await projectRepository.findAll(1, 10); 

        expect(result.data.length).toBe(1); 
        expect(result.data[0].getTitle()).toBe(projectRequest.title);
        expect(result.data[0].getDescription()).toBe(projectRequest.description);
        expect(result.data[0].getOwner()).toBe(projectRequest.owner);
    });

});