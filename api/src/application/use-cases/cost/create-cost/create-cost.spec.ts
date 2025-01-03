import { makeCost } from "@test/factories/cost.factory";
import { CreateCostUseCase } from "./create-cost.usecase";
import { CostRepository } from "@domain/repositories/cost.repository";
import { InMemoryCostRepository } from "@test/repositories/in-memory-cost.repository";

describe('Create Cost UseCase', () => {

    let createCostUseCase: CreateCostUseCase;
    let costRepository: CostRepository;

    beforeEach(() => {
        costRepository = new InMemoryCostRepository();
        createCostUseCase = new CreateCostUseCase(costRepository);
    });

    it('should create a new cost if it does not exist', async () => {
        const newCost = makeCost();

        await createCostUseCase.execute({
            title: newCost.getTitle(),
            value: newCost.getValue(),
            project: newCost.getProject()
        });

        const costs = await costRepository.findAll(1, 10);
        expect(costs.data.length).toBe(1);
        expect(costs.data[0].getTitle()).toBe(newCost.getTitle());
        expect(costs.data[0].getValue()).toBe(newCost.getValue());
    });

});