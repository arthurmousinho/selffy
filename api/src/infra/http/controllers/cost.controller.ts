import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateCostBody } from "../dtos/cost/create-cost.dto";
import { CreateCostUseCase } from "@application/use-cases/cost/create-cost/create-cost.usecase";
import { FindAllCostsUseCase } from "@application/use-cases/cost/find-all-costs/find-all-costs.usecase";
import { CostViewModel } from "../view-models/cost.viewmodel";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { DeleteCostUseCase } from "@application/use-cases/cost/delete-cost/delete-cost.usecase";
import { UpdateCostBody } from "../dtos/cost/update-cost.dto";
import { UpdateCostUseCase } from "@application/use-cases/cost/update-cost/update-cost.usecase";
import { SearchCostsByTitleUseCase } from "@application/use-cases/cost/search-costs-by-title/search-costs-by-title.usecase";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { UserFromToken } from "../decorators/user-from-token.decorator";
import { GetCostsByProjectIdUseCase } from "@application/use-cases/cost/get-costs-by-project-id/get-costs-by-project-id.usecase";

@ApiTags('Costs')
@UseGuards(JwtAuthGuard)
@Controller('costs')
export class CostController {

    constructor(
        private createCostUseCase: CreateCostUseCase,
        private findAllCostUseCase: FindAllCostsUseCase,
        private findProjectByIdUseCase: FindProjectByIdUseCase,
        private deleteCostUseCase: DeleteCostUseCase,
        private updateCostUseCase: UpdateCostUseCase,
        private searchCostByTitle: SearchCostsByTitleUseCase,
        private getCostsByProjectIdUseCase: GetCostsByProjectIdUseCase,
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

    @Get('/project/:projectId')
    public async getCostsByProjectId(
        @Param('projectId') projectId: string,
        @UserFromToken() userFromToken: UserFromToken,
    ) {
        const costs = await this.getCostsByProjectIdUseCase.execute({
            requestUserId: userFromToken.id,
            projectId
        });
        return { costs: costs.map(CostViewModel.toHTTP) };
    }

    @Post()
    public async createCost(
        @Body() body: CreateCostBody,
        @UserFromToken() userFromToken: UserFromToken,
    ) {
        const { title, value, projectId } = body;
        const project = await this.findProjectByIdUseCase.execute({
            projectId,
            requestUserId: userFromToken.id
        });
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

    @Get('/title/:title')
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