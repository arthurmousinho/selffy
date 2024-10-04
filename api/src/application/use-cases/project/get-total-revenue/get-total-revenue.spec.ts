import { makeProject } from "@test/factories/project.factory";
import { GetTotalRevenueUseCase } from "./get-total-revenue.usecase";
import { ProjectRepository } from "@application/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";

describe('Get TotalRevenue UseCase', () => {
    
    let getTotalRevenueUseCase: GetTotalRevenueUseCase;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        getTotalRevenueUseCase = new GetTotalRevenueUseCase(projectRepository);
    });

    it('should return 0 if no projects exist', async () => {
        const totalRevenue = await getTotalRevenueUseCase.execute();
        expect(totalRevenue).toBe(0);
    });

    it('should calculate total revenue of all projects', async () => {
        const project1 = makeProject();
        const project2 = makeProject();

        await projectRepository.create(project1);
        await projectRepository.create(project2);

        const totalRevenue = await getTotalRevenueUseCase.execute();
        expect(totalRevenue).toBe(2000);  
    });

});