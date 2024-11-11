import { CostRepository } from '@domain/repositories/cost.repository';
import { GetCostsTotalValueUseCase } from './get-costs-total-value.usecase';

describe('GetTotalValueUseCase', () => {

  let costRepository: CostRepository;
  let getCostsTotalValueUseCase: GetCostsTotalValueUseCase;

  beforeEach(() => {
    costRepository = {
      sumValues: jest.fn(),
    } as unknown as CostRepository;
    getCostsTotalValueUseCase = new GetCostsTotalValueUseCase(costRepository);
  });

  it('should return the total sum of costs values', async () => {
    const totalValuesSum = 1000;
    (costRepository.sumValues as jest.Mock).mockResolvedValue(totalValuesSum);

    const result = await getCostsTotalValueUseCase.execute();

    expect(costRepository.sumValues).toHaveBeenCalled();
    expect(result).toBe(totalValuesSum);
  });

  it('should handle errors thrown by the costRepository', async () => {
    const errorMessage = 'Error summing cost values';
    (costRepository.sumValues as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getCostsTotalValueUseCase.execute()).rejects.toThrow(errorMessage);
  });

});
