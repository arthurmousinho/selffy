import { Project } from "src/domain/entities/project/project.entity";
import { Project as RawProject } from "@prisma/client";
import { User as RawUser } from "@prisma/client";
import { Task as RawTask } from "@prisma/client";
import { Cost as RawCost } from "@prisma/client";
import { PrismaUserMapper } from "./prisma-user.mapper";
import { PrismaTaskMapper } from "./prisma-task.mapper";
import { PrismaCostMapper } from "./prisma-cost.mapper";

export class PrismaProjectMapper {

    public static toPrisma(project: Project): RawProject {
        return {
            id: project.getId(),
            title: project.getTitle(),
            createdAt: project.getCreatedAt(),
            updatedAt: project.getUpdatedAt(),
            ownerId: project.getOwner().getId(),
            revenue: project.getRevenue(),
            description: project.getDescription(),
            status: project.getStatus(),
            icon: project.getIcon(),
            color: project.getColor(),
        }
    }

    public static toDomain(
        raw: RawProject &
        { owner: RawUser } &
        { tasks?: RawTask[] } &
        { costs?: RawCost[] }
    ): Project {
        const owner = PrismaUserMapper.toDomain({
            id: raw.owner.id,
            name: raw.owner.name,
            email: raw.owner.email,
            password: raw.owner.password,
            createdAt: raw.owner.createdAt,
            updatedAt: raw.owner.updatedAt,
            role: raw.owner.role,
        });

        const tasks = raw.tasks?.map(PrismaTaskMapper.toDomain);

        const project = new Project({
            title: raw.title,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            owner,
            revenue: raw.revenue,
            description: raw.description,
            status: raw.status,
            icon: raw.icon,
            color: raw.color,
            tasks,
        }, raw.id)

        const costs = raw.costs?.map(cost => PrismaCostMapper.toDomain({
            ...cost,
            project
        }));

        if (costs) {
            costs.map(cost => project.addCosts(cost));
        }

        return project;
    }

}