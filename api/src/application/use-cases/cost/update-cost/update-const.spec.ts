import { CostNotFoundError } from "@application/errors/cost/cost-not-found.error";
import { makeCost } from "@test/factories/cost.factory";
import { UpdateCostUseCase } from "./update-cost.usecase";
import { CostRepository } from "@application/repositories/cost.repository";
import { InMemoryCostRepository } from "@test/repositories/in-memory-cost.repository";

describe('Update Cost UseCase', () => {
    
    let updateCostUseCase: UpdateCostUseCase;
    let costRepository: CostRepository;

    beforeEach(() => {
        costRepository = new InMemoryCostRepository(); 
        updateCostUseCase = new UpdateCostUseCase(costRepository);
    });

    it('should throw an error if the cost does not exist', async () => {
        const nonExistentCost = makeCost()

        await expect(updateCostUseCase.execute(nonExistentCost))
            .rejects
            .toThrow(CostNotFoundError);
    });

    it('should update the cost if it exists', async () => {
        const existingCost = makeCost()

        await costRepository.create(existingCost);

        existingCost.setValue(1800);
        await updateCostUseCase.execute(existingCost);

        const updatedCost = await costRepository.findById(existingCost.getId());
        expect(updatedCost).toBeTruthy();
        expect(updatedCost?.getValue()).toBe(1800);
    });

});