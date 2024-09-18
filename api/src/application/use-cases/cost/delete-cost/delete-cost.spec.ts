import { CostNotFoundError } from "@application/errors/cost/cost-not-found.error";
import { CostRepository } from "@application/repositories/cost.repository";
import { makeCost } from "@test/factories/cost.factory";
import { InMemoryCostRepository } from "@test/repositories/in-memory-cost.repository";
import { DeleteCostUseCase } from "./delete-cost.usecase";

describe('Delete Cos tUseCase', () => {

    let deleteCostUseCase: DeleteCostUseCase;
    let costRepository: CostRepository;

    beforeEach(() => {
        costRepository = new InMemoryCostRepository(); 
        deleteCostUseCase = new DeleteCostUseCase(costRepository);
    });

    it('should throw an error if the cost does not exist', async () => {
        const nonExistentCost = makeCost();

        await expect(deleteCostUseCase.execute(nonExistentCost))
            .rejects
            .toThrow(CostNotFoundError);
    });

    it('should delete the cost if it exists', async () => {
        const existingCost = makeCost();

        await costRepository.create(existingCost);

        await deleteCostUseCase.execute(existingCost);

        const deletedCost = await costRepository.findById(existingCost.getId());
        expect(deletedCost).toBeNull();
    });

});