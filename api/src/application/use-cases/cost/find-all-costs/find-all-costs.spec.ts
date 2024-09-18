import { InMemoryCostRepository } from "@test/repositories/in-memory-cost.repository";
import { FindAllCostsUseCase } from "./find-all-costs.usecase";
import { makeCost } from "@test/factories/cost.factory";
import { CostRepository } from "@application/repositories/cost.repository";

describe('Find All Costs UseCase', () => {

    let findAllCostsUseCase: FindAllCostsUseCase;
    let costRepository: CostRepository;

    beforeEach(() => {
        costRepository = new InMemoryCostRepository(); 
        findAllCostsUseCase = new FindAllCostsUseCase(costRepository);
    });

    it('should return an empty list if no costs exist', async () => {
        const costs = await findAllCostsUseCase.execute();
        expect(costs).toEqual([]);
    });

    it('should return a list of costs if they exist', async () => {
        const cost1 = makeCost();
        const cost2 = makeCost();

        await costRepository.create(cost1);
        await costRepository.create(cost2);

        const costs = await findAllCostsUseCase.execute();
        expect(costs).toHaveLength(2);
        expect(costs).toContainEqual(cost1);
        expect(costs).toContainEqual(cost2);
    });

});
