import { Cost } from "src/domain/entities/cost/cost.entity";
import { Pageable } from "@application/shared/pageable.type";
import { Injectable } from "@nestjs/common";
import { CostRepository } from "@domain/repositories/cost.repository";

@Injectable()
export class FindAllCostsUseCase {

    constructor(
        private costRepository: CostRepository
    ) { }

    public async execute(page?: number, limit?: number): Promise<Pageable<Cost>> {
        if (!page || page < 1) {
            page = 1;
        }

        if (!limit || limit < 1) {
            limit = 1;
        }

        return await this.costRepository.findAll(page, limit);
    }

}