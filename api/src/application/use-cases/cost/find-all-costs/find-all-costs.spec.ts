import { InMemoryCostRepository } from "@test/repositories/in-memory-cost.repository";
import { FindAllCostsUseCase } from "./find-all-costs.usecase";
import { makeCost } from "@test/factories/cost.factory";
import { CostRepository } from "@domain/repositories/cost.repository";

describe('Find All Costs UseCase', () => {

    let findAllCostsUseCase: FindAllCostsUseCase;
    let costRepository: CostRepository;

    beforeEach(() => {
        costRepository = new InMemoryCostRepository();
        findAllCostsUseCase = new FindAllCostsUseCase(costRepository);
    });

    it('should return an empty list if no costs exist', async () => {
        const result = await findAllCostsUseCase.execute();
        expect(result.data).toEqual([]);
        expect(result.meta.total).toBe(0);
        expect(result.meta.page).toBe(1);
        expect(result.meta.totalPages).toBe(0)
    });

    it('should return a list of costs if they exist', async () => {
        const cost1 = makeCost();
        const cost2 = makeCost();

        await costRepository.create(cost1);
        await costRepository.create(cost2);

        const pageable = await findAllCostsUseCase.execute(1, 10);
        expect(pageable.data).toHaveLength(2);
        expect(pageable.data).toContainEqual(cost1);
        expect(pageable.data).toContainEqual(cost2);
        expect(pageable.meta.page).toBe(1);
        expect(pageable.meta.totalPages).toBe(1);
        expect(pageable.meta.limit).toBe(10);
        expect(pageable.meta.total).toBe(2);
    });

});
