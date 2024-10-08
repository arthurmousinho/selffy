import { Cost } from "@application/entities/cost/cost.entity";
import { Cost as RawCost } from "@prisma/client";

export class PrismaCostMapper {

    public static toPrisma(cost: Cost): RawCost {
        return {
            id: cost.getId(),
            title: cost.getTitle(),
            createdAt: cost.getCreatedAt(),
            updatedAt: cost.getUpdatedAt(),
            value: cost.getValue(),
        }
    }

    public static toDomain(raw: RawCost): Cost {
        return new Cost({
            title: raw.title,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            value: raw.value,
        }, raw.id)
    }

}