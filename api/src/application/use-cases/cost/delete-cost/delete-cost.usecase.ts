import { CostNotFoundError } from "@application/errors/cost/cost-not-found.error";
import { CostRepository } from "@application/repositories/cost.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteCostUseCase {

    constructor(
        private costRepository: CostRepository
    ) { }

    public async execute(id: string) {
        const roleExists = await this.costRepository.findById(id);
        if (!roleExists) {
            throw new CostNotFoundError();
        }

        await this.costRepository.delete(id);
    }

}