import { Project } from "src/domain/entities/project/project.entity";
import { Project as RawProject } from "@prisma/client";
import { User as RawUser } from "@prisma/client";
import { PrismaUserMapper } from "./prisma-user.mapper";

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

    public static toDomain(raw: RawProject & { owner: RawUser }): Project {
        const owner = PrismaUserMapper.toDomain({
            id: raw.owner.id,
            name: raw.owner.name,
            email: raw.owner.email,
            password: raw.owner.password,
            createdAt: raw.owner.createdAt,
            updatedAt: raw.owner.updatedAt,
            role: raw.owner.role,
        });

        return new Project({
            title: raw.title,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            owner,
            revenue: raw.revenue,
            description: raw.description,
            status: raw.status,
            icon: raw.icon,
            color: raw.color,
        }, raw.id)
    }

}