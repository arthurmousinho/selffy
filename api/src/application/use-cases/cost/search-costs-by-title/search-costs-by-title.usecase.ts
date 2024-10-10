import { CostRepository } from "@application/repositories/cost.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchCostsByTitleUseCase {

    constructor(
        private costRepository: CostRepository
    ) { }

    public async  execute(title: string): Promise<any> {
        const costsFound = await this.costRepository.searchByTitle(title);
        return costsFound;
    }

}