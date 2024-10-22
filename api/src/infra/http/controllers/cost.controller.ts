import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateCostBody } from "../dtos/cost/create-cost.dto";
import { CreateCostUseCase } from "@application/use-cases/cost/create-cost/create-cost.usecase";
import { FindAllCostsUseCase } from "@application/use-cases/cost/find-all-costs/find-all-costs.usecase";
import { CostViewModel } from "../view-models/cost.viewmodel";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { DeleteCostUseCase } from "@application/use-cases/cost/delete-cost/delete-cost.usecase";
import { UpdateCostBody } from "../dtos/cost/update-cost.dto";
import { UpdateCostUseCase } from "@application/use-cases/cost/update-cost/update-cost.usecase";
import { SearchCostsByTitleUseCase } from "@application/use-cases/cost/search-costs-by-title/search-costs-by-title.usecase";


@Controller('costs')
export class CostController {

    constructor(
        private createCostUseCase: CreateCostUseCase,
        private findAllCostUseCase: FindAllCostsUseCase,
        private findProjectByIdUseCase: FindProjectByIdUseCase,
        private deleteCostUseCase: DeleteCostUseCase,
        private updateCostUseCase: UpdateCostUseCase,
        private searchCostByTitle: SearchCostsByTitleUseCase
    ) { }

    @Get()
    public async getCosts(@Query('page') page = 1, @Query('limit') limit = 10) {
        const pageableCosts = await this.findAllCostUseCase.execute(
            Number(page),
            Number(limit)
        );
        return {
            costs: pageableCosts.data.map(CostViewModel.toHTTP),
            meta: pageableCosts.meta
        };
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

    @Put()
    public async updateCost(@Body() body: UpdateCostBody) {
        await this.updateCostUseCase.execute(body);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string) {
        await this.deleteCostUseCase.execute(id);
    }

    @Get(':title')
    public async searchByTitle(
        @Param('title') title: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        const pageableProjectsFound = await this.searchCostByTitle.execute({
            title,
            page: Number(page),
            limit: Number(limit)
        });
        return {
            costs: pageableProjectsFound.data.map(CostViewModel.toHTTP),
            meta: pageableProjectsFound.meta
        };
    }

}