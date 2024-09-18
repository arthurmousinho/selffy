import { CostNotFoundError } from "@application/errors/cost/cost-not-found.error";
import { makeCost } from "@test/factories/cost.factory";
import { InMemoryCostRepository } from "@test/repositories/in-memory-cost.repository";
import { FindCostByIdUseCase } from "./find-cost-by-id.usecase";
import { CostRepository } from "@application/repositories/cost.repository";

describe('Find Cost By Id UseCase', () => {

    let findCostByIdUseCase: FindCostByIdUseCase;
    let costRepository: CostRepository;

    beforeEach(() => {
        costRepository = new InMemoryCostRepository(); 
        findCostByIdUseCase = new FindCostByIdUseCase(costRepository);
    });

    it('should throw an error if the cost does not exist', async () => {
        const nonExistentId = 'non-existent-id';

        await expect(findCostByIdUseCase.execute(nonExistentId))
            .rejects
            .toThrow(CostNotFoundError);
    });

    it('should return the cost if it exists', async () => {
        const existingCost = makeCost();
        await costRepository.create(existingCost);

        const foundCost = await findCostByIdUseCase.execute(existingCost.getId());
        expect(foundCost).toEqual(existingCost);
    });

});
