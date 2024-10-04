import { Project } from "@application/entities/project/project.entity";
import { Project as RawProject } from "@prisma/client";

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

}