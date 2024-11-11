import { Cost } from "src/domain/entities/cost/cost.entity";
import { Pageable } from "@application/shared/pageable.type";
import { Injectable } from "@nestjs/common";
import { CostRepository } from "@domain/repositories/cost.repository";

interface SearchCostsByTitleUseCaseRequest {
    title: string;
    page: number;
    limit: number;
}

@Injectable()
export class SearchCostsByTitleUseCase {

    constructor(
        private costRepository: CostRepository
    ) { }

    public async execute(request: SearchCostsByTitleUseCaseRequest): Promise<Pageable<Cost>> {
        if (!request.page || request.page < 1) {
            request.page = 1;
        }

        if (!request.limit || request.limit < 1) {
            request.limit = 10;
        }

        return await this.costRepository.findManyByTitle(request);
    }

}