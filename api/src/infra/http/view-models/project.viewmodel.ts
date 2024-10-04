import { Project } from "@application/entities/project/project.entity";

export class ProjectViewModel {
    
    static toHTTP(project: Project) {
        return {
            id: project.getId(),
            title: project.getTitle(),
            description: project.getDescription(),
            revenue: project.getRevenue(),
            icon: project.getIcon(),
            color: project.getColor(),
            owner: {
                id: project.getOwner().getId(),
                name: project.getOwner().getName(),
                email: project.getOwner().getEmail(),
            },
            createdAt: project.getCreatedAt(),
            updatedAt: project.getUpdatedAt()
        }
    }

}