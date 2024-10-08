import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateCostBody } from "../dtos/cost/create-cost.dto";
import { CreateCostUseCase } from "@application/use-cases/cost/create-cost/create-cost.usecase";
import { FindAllCostsUseCase } from "@application/use-cases/cost/find-all-costs/find-all-costs.usecase";
import { CostViewModel } from "../view-models/cost.viewmodel";


@Controller('costs')
export class ConstController {

    constructor(
        private createCostUseCase: CreateCostUseCase,
        private findAllCostUseCase: FindAllCostsUseCase
    ) { }

    @Get()
    public async getCosts() {
        const costs = await this.findAllCostUseCase.execute();
        return { costs: costs.map(CostViewModel.toHTTP) };
    }

    @Post()
    public async createCost(@Body() body: CreateCostBody) {
        const { title, value } = body;
        await this.createCostUseCase.execute({
            title,
            value
        })
    }

}