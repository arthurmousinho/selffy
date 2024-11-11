import { Project } from "src/domain/entities/project/project.entity";

export class ProjectViewModel {

    static toHTTP(project: Project) {
        return {
            id: project.getId(),
            title: project.getTitle(),
            description: project.getDescription(),
            revenue: project.getRevenue(),
            icon: project.getIcon(),
            color: project.getColor(),
            status: project.getStatus(),
            tasks: project.getTasks(),
            ownerId: project.getOwner().getId(),
            createdAt: project.getCreatedAt(),
            updatedAt: project.getUpdatedAt()
        }
    }

}