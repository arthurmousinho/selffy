import { Task } from "@domain/entities/task/task.entity";
import { ProjectAlreadyFinishedError } from "@application/errors/project/project-already-finished.error";
import { TaskDueDateInPastError } from "@application/errors/task/task-due-date-in-past.error";
import { TaskNotFoundError } from "@application/errors/task/task-not-found.error";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { TaskRepository } from "@domain/repositories/task.repository";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { Injectable } from "@nestjs/common";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { User } from "@domain/entities/user/user.entity";
import { Project } from "@domain/entities/project/project.entity";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";

interface UpdateTaskUseCaseRequest {
    requestUserId: string;
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
    priority: TaskPriority;
    projectId: string;
}

interface CheckAbilityRequest {
    project: Project;
    requestUser: User;
}

@Injectable()
export class UpdateTaskUseCase {

    constructor(
        private taskRepository: TaskRepository,
        private findProjectByIdUseCase: FindProjectByIdUseCase,
        private findUserByIdUseCase: FindUserByIdUseCase
    ) { }

    public async execute(request: UpdateTaskUseCaseRequest) {
        const [ taskFound, project, requestUser ] = await Promise.all([
            this.getTaskById(request.id),
            this.checkProjectById(request.projectId, request.requestUserId),
            this.findUserByIdUseCase.execute(request.requestUserId)
        ]);

        this.checkDueDate(request.dueDate);
        this.checkAbility({ project, requestUser });

        taskFound.setTitle(request.title);
        taskFound.setDescription(request.description);
        taskFound.setStatus(request.status);
        taskFound.setDueDate(request.dueDate);
        taskFound.setPriority(request.priority);
        taskFound.update();
        taskFound.setProjectId(project.getId());
        
        if (request.status === 'COMPLETED') {
            taskFound.complete();
        }

        await this.taskRepository.update(taskFound);
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

    private async checkProjectById(projectId: string, requestUserId: string) {
        const project = await this.findProjectByIdUseCase.execute({
            projectId,
            requestUserId
        });

        if (project.getStatus() === 'FINISHED') {
            throw new ProjectAlreadyFinishedError();
        }

        return project;
    }

    private checkAbility(request: CheckAbilityRequest) {
        const { project, requestUser } = request;

        const isAdminUser = requestUser.getRole() === 'ADMIN';
        const isOwner = requestUser.getId() === project.getOwner().getId();

        if (isAdminUser || isOwner) {
            return;
        }

        throw new UnauthorizedUserError();
    }

}