import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateCostBody } from "../dtos/cost/create-cost.dto";
import { CreateCostUseCase } from "@application/use-cases/cost/create-cost/create-cost.usecase";
import { FindAllCostsUseCase } from "@application/use-cases/cost/find-all-costs/find-all-costs.usecase";
import { CostViewModel } from "../view-models/cost.viewmodel";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";


@Controller('costs')
export class CostController {

    constructor(
        private createCostUseCase: CreateCostUseCase,
        private findAllCostUseCase: FindAllCostsUseCase,
        private findProjectByIdUseCase: FindProjectByIdUseCase
    ) { }

    @Get()
    public async getCosts() {
        const costs = await this.findAllCostUseCase.execute();
        return { costs: costs.map(CostViewModel.toHTTP) };
    }

    @Post()
    public async createCost(@Body() body: CreateCostBody) {
        const { title, value, projectId } = body;
        const project = await this.findProjectByIdUseCase.execute(projectId);
        await this.createCostUseCase.execute({
            title,
            value,
            project
        })
    }

}