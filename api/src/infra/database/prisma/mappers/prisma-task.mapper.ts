import { Task } from "@application/entities/task/task.entity"
import { Task as RawTask } from "@prisma/client"

export class PrismaTaskMapper {

    public static toPrisma(task: Task): RawTask {
        return {
            id: task.getId(),
            title: task.getTitle(),
            createdAt: task.getCreatedAt(),
            completedAt: task.getCompletedAt(),
            dueDate: task.getDueDate(),
            description: task.getDescription(),
            priority: task.getPriority(),
            projectId: task.getProjectId(),
            status: task.getStatus(),
        }
    }

    public static toDomain(raw: RawTask): Task {
        return new Task({
            title: raw.title,
            createdAt: raw.createdAt,
            completedAt: raw.completedAt ?? undefined,
            dueDate: raw.dueDate,
            description: raw.description,
            priority: raw.priority,
            projectId: raw.projectId,
            status: raw.status,
        }, raw.id)
    }


}