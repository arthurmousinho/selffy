import { GetCostsInsightsUseCase } from "./get-costs-insights.usecase";
import { CountCostsUseCase } from "../count-costs/count-costs.usecase";
import { GetCostsTotalValueUseCase } from "../get-costs-total-value/get-costs-total-value.usecase";

describe('GetCostsInsightsUseCase', () => {
  let getCostsInsightsUseCase: GetCostsInsightsUseCase;
  let countCostsUseCase: CountCostsUseCase;
  let getCostsTotalValueUseCase: GetCostsTotalValueUseCase;

  beforeEach(() => {
    countCostsUseCase = {
      execute: jest.fn(),
    } as unknown as CountCostsUseCase;

    getCostsTotalValueUseCase = {
      execute: jest.fn(),
    } as unknown as GetCostsTotalValueUseCase;

    getCostsInsightsUseCase = new GetCostsInsightsUseCase(
      countCostsUseCase,
      getCostsTotalValueUseCase,
    );
  });

  it('should return the total costs and their total value', async () => {
    const mockCostsCount = 5;
    const mockCostsTotalValue = 1500;

    (countCostsUseCase.execute as jest.Mock).mockResolvedValue(mockCostsCount);
    (getCostsTotalValueUseCase.execute as jest.Mock).mockResolvedValue(mockCostsTotalValue);

    const result = await getCostsInsightsUseCase.execute();

    expect(countCostsUseCase.execute).toHaveBeenCalled();
    expect(getCostsTotalValueUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual({
      tatal: mockCostsCount,
      totalValue: mockCostsTotalValue,
    });
  });

  it('should handle errors thrown by the use cases', async () => {
    const errorMessage = 'Error fetching costs insights';
    (countCostsUseCase.execute as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getCostsInsightsUseCase.execute()).rejects.toThrow(errorMessage);
  });

});