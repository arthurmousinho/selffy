import { CostRepository } from "@domain/repositories/cost.repository";
import { GetCostsByProjectIdUseCase } from "./get-costs-by-project-id.usecase";
import { InMemoryCostRepository } from "@test/repositories/in-memory-cost.repository";
import { makeCost } from "@test/factories/cost.factory";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";
import { makeUser } from "@test/factories/user.factory";
import { UserRepository } from "@domain/repositories/user.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";

describe('GetCostsByProjectIdUseCase', () => {

    let getCostsByProjectIdUseCase: GetCostsByProjectIdUseCase;
    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let findUserByIdUseCase: FindUserByIdUseCase;

    let costRepository: CostRepository;
    let projectRepository: ProjectRepository;
    let userRepository: UserRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        costRepository = new InMemoryCostRepository();
        userRepository = new InMemoryUserRepository();

        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository, findUserByIdUseCase);
        getCostsByProjectIdUseCase = new GetCostsByProjectIdUseCase(costRepository, findProjectByIdUseCase);
    });

    it('should return costs for a project owned by the user', async () => {
        const user = makeUser({ role: 'FREE' });
        await userRepository.create(user);

        const project = makeProject({ owner: user });
        await projectRepository.create(project);

        const cost1 = makeCost({ project });
        const cost2 = makeCost({ project });
        await costRepository.create(cost1);
        await costRepository.create(cost2);

        const costs = await getCostsByProjectIdUseCase.execute({
            requestUserId: user.getId(),
            projectId: project.getId()
        });

        expect(costs.length).toBe(2);
        expect(costs[0].getProject().getId()).toBe(project.getId());
        expect(costs[1].getProject().getId()).toBe(project.getId());
    });

    it('should throw UnauthorizedUserError if the user tries to access costs of a project they do not own', async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const otherUser = makeUser();
        await userRepository.create(otherUser);

        const project = makeProject({ owner: owner });
        await projectRepository.create(project);

        await expect(getCostsByProjectIdUseCase.execute({
            requestUserId: otherUser.getId(),
            projectId: project.getId()
        })).rejects.toThrow(UnauthorizedUserError);
    });

    it('should return costs for any project when the user is an admin', async () => {
        const freeUser = makeUser({ role: 'FREE' });
        const adminUser = makeUser({ role: 'ADMIN' });

        await Promise.all([
            userRepository.create(adminUser),
            userRepository.create(freeUser)
        ])

        const otherUserProject = makeProject({ owner: makeUser() });
        await projectRepository.create(otherUserProject);

        const cost1 = makeCost({ project: otherUserProject });
        const cost2 = makeCost({ project: otherUserProject });

        await Promise.all([
            await costRepository.create(cost1),
            await costRepository.create(cost2)
        ])

        const costs = await getCostsByProjectIdUseCase.execute({
            requestUserId: adminUser.getId(),
            projectId: otherUserProject.getId()
        });

        expect(costs.length).toBe(2);
        expect(costs[0].getProject().getId()).toBe(otherUserProject.getId());
        expect(costs[1].getProject().getId()).toBe(otherUserProject.getId());
    });

    it('should return an empty array if there are no costs for the given project', async () => {
        const user = makeUser({ role: 'FREE' });
        await userRepository.create(user);

        const project = makeProject({ owner: user });
        await projectRepository.create(project);

        const costs = await getCostsByProjectIdUseCase.execute({
            requestUserId: user.getId(),
            projectId: project.getId()
        });

        expect(costs.length).toBe(0);
    });

});
