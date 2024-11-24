import { GetUserTasksGroupedByPriorityUseCase } from "./get-user-tasks-grouped-by-priority.usecase";
import { TaskRepository } from "@domain/repositories/task.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { InMemoryTaskRepository } from "@test/repositories/in-memory-task.repository";
import { makeTask } from "@test/factories/task.factory";
import { makeUser } from "@test/factories/user.factory";
import { UserRepository } from "@domain/repositories/user.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { makeProject } from "@test/factories/project.factory";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";

describe('GetUserTasksGroupedByPriorityUseCase', () => {
    let getUserTasksGroupedByPriorityUseCase: GetUserTasksGroupedByPriorityUseCase;

    let taskRepository: TaskRepository;
    let userRepository: UserRepository;
    let projectRepository: ProjectRepository;

    let findUserByIdUseCase: FindUserByIdUseCase;

    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository();
        userRepository = new InMemoryUserRepository();
        projectRepository = new InMemoryProjectRepository();

        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        getUserTasksGroupedByPriorityUseCase = new GetUserTasksGroupedByPriorityUseCase(taskRepository, findUserByIdUseCase);
    });

    it('should throw UnauthorizedUserError if user is not authorized to access tasks', async () => {
        const requestUser = makeUser({ role: 'FREE' });
        const otherUser = makeUser({ role: 'FREE' });

        await Promise.all([
            userRepository.create(requestUser),
            userRepository.create(otherUser),
        ]);

        await expect(
            getUserTasksGroupedByPriorityUseCase.execute({
                requestUserId: requestUser.getId(),
                userId: otherUser.getId(),
            })
        ).rejects.toThrow(UnauthorizedUserError);
    });

});