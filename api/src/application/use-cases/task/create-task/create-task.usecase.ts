import { Task, TaskPriority } from "@application/entities/task/task.entity";
import { ProjectAlreadyFinishedError } from "@application/errors/project/project-already-finished.error";
import { TaskRepository } from "@application/repositories/task.repository";
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
        private findPrjectByIdUseCase: FindProjectByIdUseCase
    ) { }

    public async execute(request: CreateTaskUseCaseRequest) {
        const { title, dueDate, priority, projectId, description } = request;

        const project = await this.findPrjectByIdUseCase.execute(projectId);

        if (project.getStatus() === 'FINISHED') {
            throw new ProjectAlreadyFinishedError();
        }

        const newTask = new Task({
            title,
            dueDate,
            priority,
            projectId,
            description
        });

        await this.taskRepository.create(newTask);
    }
}