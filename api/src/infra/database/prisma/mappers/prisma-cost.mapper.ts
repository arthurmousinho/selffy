import { Cost } from "src/domain/entities/cost/cost.entity";
import { Cost as RawCost, Project as RawProject, User as RawUser } from "@prisma/client";
import { PrismaProjectMapper } from "./prisma-project.mapper";
import { Project } from "@domain/entities/project/project.entity";
export class PrismaCostMapper {

    public static toPrisma(cost: Cost): RawCost {
        return {
            id: cost.getId(),
            title: cost.getTitle(),
            createdAt: cost.getCreatedAt(),
            projectId: cost.getProject().getId(),
            updatedAt: cost.getUpdatedAt(),
            value: cost.getValue(),
        }
    }

    public static toDomain(raw: RawCost & { project: Project }): Cost {
        return new Cost({
            title: raw.title,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            value: raw.value,
            project: raw.project,
        }, raw.id)
    }

}