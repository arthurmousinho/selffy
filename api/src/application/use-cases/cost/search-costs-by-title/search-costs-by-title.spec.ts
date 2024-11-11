import { CostRepository } from "@domain/repositories/cost.repository";
import { InMemoryCostRepository } from '@test/repositories/in-memory-cost.repository';
import { makeCost } from '@test/factories/cost.factory';
import { SearchCostsByTitleUseCase } from './search-costs-by-title.usecase';

describe('SearchCostsByTitleUseCase', () => {

    let searchCostsByTitleUseCase: SearchCostsByTitleUseCase;
    let costRepository: CostRepository;

    beforeEach(() => {
        costRepository = new InMemoryCostRepository();
        searchCostsByTitleUseCase = new SearchCostsByTitleUseCase(costRepository);
    });

    it('should return an empty list if no costs match the title', async () => {
        const result = await searchCostsByTitleUseCase.execute({ title: 'Non-existent title', page: 1, limit: 10 });

        expect(result.data).toEqual([]);
        expect(result.meta.total).toBe(0);
        expect(result.meta.page).toBe(1);
        expect(result.meta.totalPages).toBe(0);
    });

    it('should return costs that match the title', async () => {
        const cost1 = makeCost({ title: 'First Cost' });
        const cost2 = makeCost({ title: 'Second Cost' });

        await costRepository.create(cost1);
        await costRepository.create(cost2);

        const result = await searchCostsByTitleUseCase.execute({ title: 'First Cost', page: 1, limit: 10 });

        expect(result.data.length).toBe(1);
        expect(result.data).toContainEqual(cost1);
        expect(result.meta.total).toBe(1);
        expect(result.meta.page).toBe(1);
        expect(result.meta.totalPages).toBe(1);
    });

    it('should return multiple costs if more than one match the title', async () => {
        const cost1 = makeCost({ title: 'Cost Alpha' });
        const cost2 = makeCost({ title: 'Cost Beta' });
        const cost3 = makeCost({ title: 'Cost Alpha Beta' });

        await costRepository.create(cost1);
        await costRepository.create(cost2);
        await costRepository.create(cost3);

        const result = await searchCostsByTitleUseCase.execute({ title: 'Cost Alpha', page: 1, limit: 10 });

        expect(result.data.length).toBe(2);
        expect(result.data).toContainEqual(cost1);
        expect(result.data).toContainEqual(cost3);
        expect(result.meta.total).toBe(2);
        expect(result.meta.page).toBe(1);
        expect(result.meta.totalPages).toBe(1);
    });

});