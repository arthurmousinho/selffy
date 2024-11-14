import { CostNotFoundError } from "@application/errors/cost/cost-not-found.error";
import { makeCost } from "@test/factories/cost.factory";
import { UpdateCostUseCase } from "./update-cost.usecase";
import { InMemoryCostRepository } from "@test/repositories/in-memory-cost.repository";
import { FindProjectByIdUseCase } from "@application/use-cases/project/find-project-by-id/find-project-by-id.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { CostRepository } from "@domain/repositories/cost.repository";
import { UserRepository } from "@domain/repositories/user.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { makeUser } from "@test/factories/user.factory";

describe('Update Cost UseCase', () => {

    let updateCostUseCase: UpdateCostUseCase;
    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let findUserByIdUseCase: FindUserByIdUseCase;

    let costRepository: CostRepository;
    let projectRepository: ProjectRepository;
    let userRepository: UserRepository;

    beforeEach(() => {
        costRepository = new InMemoryCostRepository();
        projectRepository = new InMemoryProjectRepository();
        userRepository = new InMemoryUserRepository();

        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository, findUserByIdUseCase);
        updateCostUseCase = new UpdateCostUseCase(costRepository, findProjectByIdUseCase);
    });

    it('should throw an error if the cost does not exist', async () => {
        const nonExistentCost = makeCost();

        await expect(updateCostUseCase.execute({
            id: nonExistentCost.getId(),
            title: nonExistentCost.getTitle(),
            value: nonExistentCost.getValue(),
            projectId: nonExistentCost.getProject().getId()
        }))
            .rejects
            .toThrow(CostNotFoundError);
    });

    it('should update the cost if it exists', async () => {
        const user = makeUser();
        await userRepository.create(user);

        const existingProject = makeProject({ owner: user });
        await projectRepository.create(existingProject);

        const existingCost = makeCost({ project: existingProject });
        await costRepository.create(existingCost);

        const updatedValue = 1800;
        await updateCostUseCase.execute({
            id: existingCost.getId(),
            title: existingCost.getTitle(),
            value: updatedValue,
            projectId: existingProject.getId()
        });

        const updatedCost = await costRepository.findById(existingCost.getId());
        expect(updatedCost).toBeTruthy();
        expect(updatedCost?.getValue()).toBe(updatedValue);
        expect(updatedCost?.getProject()).toEqual(existingProject);
    });

});
