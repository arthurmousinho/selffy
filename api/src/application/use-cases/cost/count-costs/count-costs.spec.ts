import { CostRepository } from '@domain/repositories/cost.repository';
import { CountCostsUseCase } from './count-costs.usecase';

describe('CountCostsUseCase', () => {
  let costRepository: CostRepository;
  let countCostsUseCase: CountCostsUseCase;

  beforeEach(() => {
    costRepository = {
      count: jest.fn(),
    } as unknown as CostRepository;
    countCostsUseCase = new CountCostsUseCase(costRepository);
  });

  it('should return the number of costs', async () => {
    const costsCount = 5;
    (costRepository.count as jest.Mock).mockResolvedValue(costsCount);

    const result = await countCostsUseCase.execute();

    expect(costRepository.count).toHaveBeenCalled();
    expect(result).toBe(costsCount);
  });

  it('should handle errors thrown by the costRepository', async () => {
    const errorMessage = 'Error counting costs';
    (costRepository.count as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(countCostsUseCase.execute()).rejects.toThrow(errorMessage);
  });

});