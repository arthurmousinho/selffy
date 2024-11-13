import { Task, TaskPriority } from "@domain/entities/task/task.entity";
import { ProjectAlreadyFinishedError } from "@application/errors/project/project-already-finished.error";
import { TaskDueDateInPastError } from "@application/errors/task/task-due-date-in-past.error";
import { TaskRepository } from "@domain/repositories/task.repository";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { Injectable } from "@nestjs/common";
import { User } from "@domain/entities/user/user.entity";
import { Project } from "@domain/entities/project/project.entity";

interface CreateTaskUseCaseRequest {
    requestUserId: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: TaskPriority;
    projectId: string;
}

interface CheckAbilityRequest {
    requestUser: User;
    project: Project;
}

@Injectable()
export class CreateTaskUseCase {

    constructor(
        private taskRepository: TaskRepository,
        private findProjectByIdUseCase: FindProjectByIdUseCase
    ) { }

    public async execute(request: CreateTaskUseCaseRequest) {
        const { title, dueDate, priority, projectId, description, requestUserId } = request;

        const project = await this.findProjectByIdUseCase.execute({
            projectId,
            requestUserId
        })
        
        if (project.getStatus() === 'FINISHED') {
            throw new ProjectAlreadyFinishedError();
        }

        this.checkDueDate(dueDate);

        const newTask = new Task({
            title,
            dueDate,
            priority,
            projectId,
            description,
            completedAt: null
        });

        const taskCreated = await this.taskRepository.create(newTask);
        return taskCreated;
    }

    private checkDueDate(dueDate: Date) {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const taskDueDate = new Date(dueDate);

        if (taskDueDate < today) {
            throw new TaskDueDateInPastError();
        }
    }

}