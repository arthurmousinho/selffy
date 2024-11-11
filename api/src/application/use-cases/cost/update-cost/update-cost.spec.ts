import { CostNotFoundError } from "@application/errors/cost/cost-not-found.error";
import { makeCost } from "@test/factories/cost.factory";
import { UpdateCostUseCase } from "./update-cost.usecase";
import { InMemoryCostRepository } from "@test/repositories/in-memory-cost.repository";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { CostRepository } from "@domain/repositories/cost.repository";

describe('Update Cost UseCase', () => {

    let updateCostUseCase: UpdateCostUseCase;
    let findProjectByIdUseCase: FindProjectByIdUseCase;

    let costRepository: CostRepository;
    let projectRepository: ProjectRepository;

    beforeEach(() => {
        costRepository = new InMemoryCostRepository();
        projectRepository = new InMemoryProjectRepository();

        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository);
        updateCostUseCase = new UpdateCostUseCase(costRepository, findProjectByIdUseCase);
    });

    it('should throw an error if the cost does not exist', async () => {
        const nonExistentCost = makeCost();

        await expect(updateCostUseCase.execute({
            id: nonExistentCost.getId(),
            title: nonExistentCost.getTitle(),
            value: nonExistentCost.getValue(),
            projectId: nonExistentCost.getProject().getId()
        }))
            .rejects
            .toThrow(CostNotFoundError);
    });

    it('should update the cost if it exists', async () => {
        const existingCost = makeCost();
        const existingProject = makeProject();

        await projectRepository.create(existingProject);
        await costRepository.create(existingCost);

        const updatedValue = 1800;
        await updateCostUseCase.execute({
            id: existingCost.getId(),
            title: existingCost.getTitle(),
            value: updatedValue,
            projectId: existingProject.getId()
        });

        const updatedCost = await costRepository.findById(existingCost.getId());
        expect(updatedCost).toBeTruthy();
        expect(updatedCost?.getValue()).toBe(updatedValue);
        expect(updatedCost?.getProject()).toEqual(existingProject);
    });

});
