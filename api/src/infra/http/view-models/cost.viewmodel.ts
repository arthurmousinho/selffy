import { Cost } from "@application/entities/cost/cost.entity";

export class CostViewModel {

    static toHTTP(cost: Cost) {
        return {
            id: cost.getId(),
            title: cost.getTitle(),
            value: cost.getValue(),
            createdAt: cost.getCreatedAt(),
            updatedAt: cost.getUpdatedAt()
        }
    }

}