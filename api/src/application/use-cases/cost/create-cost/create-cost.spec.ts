import { makeCost } from "@test/factories/cost.factory";
import { CreateCostUseCase } from "./create-cost.usecase";
import { CostRepository } from "@application/repositories/cost.repository";
import { InMemoryCostRepository } from "@test/repositories/in-memory-cost.repository";
import { CostAlreadyExistsError } from "@application/errors/cost/cost-already-exists.error";

describe('Create Cost UseCase', () => {

    let createCostUseCase: CreateCostUseCase;
    let costRepository: CostRepository;

    beforeEach(() => {
        costRepository = new InMemoryCostRepository(); 
        createCostUseCase = new CreateCostUseCase(costRepository);
    });

    it('should throw an error if the cost already exists', async () => {
        const existingCost = makeCost();

        await costRepository.create(existingCost);

        await expect(createCostUseCase.execute(existingCost))
            .rejects
            .toThrow(CostAlreadyExistsError);
    });

    it('should create a new cost if it does not exist', async () => {
        const newCost = makeCost();

        await createCostUseCase.execute(newCost);

        const costs = await costRepository.findAll();
        expect(costs.length).toBe(1);
        expect(costs[0].getTitle()).toBe(newCost.getTitle());
        expect(costs[0].getValue()).toBe(newCost.getValue());
    });

});