import { Cost } from "@application/entities/cost/cost.entity";
import { CostRepository } from "@application/repositories/cost.repository";
import { Pageable } from "@application/types/pageable.type";
import { Injectable } from "@nestjs/common";

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