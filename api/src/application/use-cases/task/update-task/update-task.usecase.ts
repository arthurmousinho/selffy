import { Task } from "@application/entities/task/task.entity";
import { ProjectAlreadyFinishedError } from "@application/errors/project/project-already-finished.error";
import { TaskDueDateInPastError } from "@application/errors/task/task-due-date-in-past.error";
import { TaskNotFoundError } from "@application/errors/task/task-not-found.error";
import { TaskRepository } from "@application/repositories/task.repository";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { Injectable } from "@nestjs/common";
import { TaskPriority, TaskStatus } from "@prisma/client";

interface UpdateTaskUseCaseRequest {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
    priority: TaskPriority;
    projectId: string;
}

@Injectable()
export class UpdateTaskUseCase {

    constructor(
        private taskRepository: TaskRepository,
        private findProjectByIdUseCase: FindProjectByIdUseCase
    ) { }

    public async execute(request: UpdateTaskUseCaseRequest) {
        const [ taskFound ] = await Promise.all([
            this.getTaskById(request.id),
            this.checkProjectById(request.projectId)
        ]);
        this.checkDueDate(request.dueDate);

        const taskUpdated = new Task({
            title: request.title,
            description: request.description,
            status: request.status,
            dueDate: request.dueDate,
            priority: request.priority,
            createdAt: taskFound.getCreatedAt(),
            updatedAt: new Date(),
            completedAt: request.status === 'COMPLETED' ? new Date() : taskFound.getCompletedAt(),
            projectId: request.projectId
        }, taskFound.getId());

        await this.taskRepository.update(taskUpdated);
    }

    private async getTaskById(id: string) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new TaskNotFoundError();
        }
        return task;
    }

    private checkDueDate(dueDate: Date) {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const taskDueDate = new Date(dueDate);
        if (taskDueDate < today) {
            throw new TaskDueDateInPastError();
        }
    }

    private async checkProjectById(id: string) {
        const project = await this.findProjectByIdUseCase.execute(id);

        if (project.getStatus() === 'FINISHED') {
            throw new ProjectAlreadyFinishedError();
        }
    }

}