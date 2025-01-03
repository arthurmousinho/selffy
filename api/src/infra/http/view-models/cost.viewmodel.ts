import { Cost } from "src/domain/entities/cost/cost.entity";

export class CostViewModel {

    static toHTTP(cost: Cost) {
        return {
            id: cost.getId(),
            title: cost.getTitle(),
            value: cost.getValue(),
            projectId: cost.getProject().getId(),
            createdAt: cost.getCreatedAt(),
            updatedAt: cost.getUpdatedAt()
        }
    }

}