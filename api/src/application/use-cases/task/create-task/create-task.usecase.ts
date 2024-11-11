import { Task, TaskPriority } from "src/domain/entities/task/task.entity";
import { ProjectAlreadyFinishedError } from "@application/errors/project/project-already-finished.error";
import { TaskDueDateInPastError } from "@application/errors/task/task-due-date-in-past.error";
import { TaskRepository } from "@domain/repositories/task.repository";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { Injectable } from "@nestjs/common";

interface CreateTaskUseCaseRequest {
    title: string;
    description: string;
    dueDate: Date;
    priority: TaskPriority;
    projectId: string;
}

@Injectable()
export class CreateTaskUseCase {

    constructor(
        private taskRepository: TaskRepository,
        private findProjectByIdUseCase: FindProjectByIdUseCase
    ) { }

    public async execute(request: CreateTaskUseCaseRequest) {
        const { title, dueDate, priority, projectId, description } = request;

        this.checkDueDate(dueDate);
        await this.checkProjectById(projectId);

        const newTask = new Task({
            title,
            dueDate,
            priority,
            projectId,
            description,
            completedAt: null
        });

        await this.taskRepository.create(newTask);
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

        const project = await this.findProjectByIdUseCase.execute({
            requestUserId: '1',
            projectId: id
        });

        if (project.getStatus() === 'FINISHED') {
            throw new ProjectAlreadyFinishedError();
        }
    }

}