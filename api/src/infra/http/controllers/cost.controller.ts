import { Body, Controller, Post } from "@nestjs/common";
import { CreateCostBody } from "../dtos/cost/create-cost.dto";
import { CreateCostUseCase } from "@application/use-cases/cost/create-cost/create-cost.usecase";


@Controller('costs')
export class ConstController {

    constructor(
        private createCostUseCase: CreateCostUseCase
    ) { }

    @Post()
    public async createCost(@Body() body: CreateCostBody) {
        const { title, value } = body;
        await this.createCostUseCase.execute({
            title,
            value
        })
    }

}