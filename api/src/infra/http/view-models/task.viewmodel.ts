import { Task } from "src/domain/entities/task/task.entity";

export class TaskViewModel {

    static toHTTP(task: Task) {
        return {
            id: task.getId(),
            title: task.getTitle(),
            description: task.getDescription(),
            createdAt: task.getCreatedAt(),
            updatedAt: task.getUpdatedAt(),
            completedAt: task.getCompletedAt(),
            dueDate: task.getDueDate(),
            status: task.getStatus(),
            priority: task.getPriority(),
            projectId: task.getProjectId(),
        }
    }

}