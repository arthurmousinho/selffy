import { SearchCostsByTitleUseCase } from "./search-costs-by-title.usecase";
import { CostRepository } from "@application/repositories/cost.repository";
import { InMemoryCostRepository } from "@test/repositories/in-memory-cost.repository";
import { makeCost } from "@test/factories/cost.factory";

describe('Search Costs By Title UseCase', () => {
    
    let searchCostsByTitleUseCase: SearchCostsByTitleUseCase;
    let costRepository: CostRepository;

    beforeEach(() => {
        costRepository = new InMemoryCostRepository(); 
        searchCostsByTitleUseCase = new SearchCostsByTitleUseCase(costRepository);
    });

    it('should return costs that match the title', async () => {
        const cost1 = makeCost({ title: 'Marketing Cost' });
        const cost2 = makeCost({ title: 'Office Cost' });
        const cost3 = makeCost({ title: 'Marketing Budget' });

        await costRepository.create(cost1);
        await costRepository.create(cost2);
        await costRepository.create(cost3);

        const foundCosts = await searchCostsByTitleUseCase.execute('Marketing');

        expect(foundCosts).toHaveLength(2);
        expect(foundCosts).toEqual(expect.arrayContaining([cost1, cost3]));
    });

    it('should return an empty array if no costs match the title', async () => {
        const cost1 = makeCost({ title: 'Development Cost' });
        const cost2 = makeCost({ title: 'Design Cost' });

        await costRepository.create(cost1);
        await costRepository.create(cost2);

        const foundCosts = await searchCostsByTitleUseCase.execute('Marketing');

        expect(foundCosts).toHaveLength(0);
    });

});