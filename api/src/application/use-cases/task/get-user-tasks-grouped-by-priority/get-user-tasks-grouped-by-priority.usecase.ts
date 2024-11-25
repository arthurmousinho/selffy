import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { Task } from "@domain/entities/task/task.entity";
import { TaskRepository } from "@domain/repositories/task.repository";
import { Injectable } from "@nestjs/common";

export interface Request {
    requestUserId: string;
    userId: string;
}

@Injectable()
export class GetUserTasksGroupedByPriorityUseCase {

    constructor(
        private taskRepository: TaskRepository,
        private findUserByIdUseCase: FindUserByIdUseCase
    ) { }

    public async execute(request: Request) {
        await this.checkAbility(request);

        const userTasks = await this.taskRepository.findByUserId(request.userId);
        const pendingTasks = userTasks.filter(task => task.getStatus() === 'PENDING');

        const highPriorityTasks = pendingTasks.filter(task => task.getPriority() === 'HIGH');
        const mediumPriorityTasks = pendingTasks.filter(task => task.getPriority() === 'MEDIUM');
        const lowPriorityTasks = pendingTasks.filter(task => task.getPriority() === 'LOW');

        return {
            high: this.formartOutput(highPriorityTasks),
            medium: this.formartOutput(mediumPriorityTasks),
            low: this.formartOutput(lowPriorityTasks)
        }
    }

    public async checkAbility(request: Request) {
        const [requestUser, user] = await Promise.all([
            this.findUserByIdUseCase.execute({
                userId: request.requestUserId,
                requestUserId: request.requestUserId,
            }),
            this.findUserByIdUseCase.execute({
                userId: request.userId,
                requestUserId: request.requestUserId,
            })
        ]);

        if (requestUser.getRole() === 'ADMIN') {
            return;
        }

        if (requestUser.getId() !== user.getId()) {
            throw new UnauthorizedUserError();
        }
    }

    public formartOutput(tasks: Task[]) {
        return tasks.map(task => {
            return {
                id: task.getId(),
                title: task.getTitle(),
                status: task.getStatus(),
                priority: task.getPriority(),
                dueDate: task.getDueDate(),
                createdAt: task.getCreatedAt(),
                updatedAt: task.getUpdatedAt(),
                projectId: task.getProjectId()
            }
        })
    }

}