import { FindProjectByIdUseCase } from "../find-project-by-id/find-project-by-id.usecase";
import { InMemoryProjectRepository } from "@test/repositories/in-memory-project.repository";
import { makeProject } from "@test/factories/project.factory";
import { makeUser } from "@test/factories/user.factory";
import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { UserRepository } from "@domain/repositories/user.repository";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user.repository";
import { ToogleProjectPinUseCase } from "./toggle-project-pin.usecase";
import { ProjectNotFoundError } from "@application/errors/project/project-not-found.error";

describe("ToogleProjectPinUseCase", () => {
    let toogleProjectPinUseCase: ToogleProjectPinUseCase;
    let findProjectByIdUseCase: FindProjectByIdUseCase;
    let findUserByIdUseCase: FindUserByIdUseCase;

    let projectRepository: ProjectRepository;
    let userRepository: UserRepository;

    beforeEach(() => {
        projectRepository = new InMemoryProjectRepository();
        userRepository = new InMemoryUserRepository();

        findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository, findUserByIdUseCase);
        toogleProjectPinUseCase = new ToogleProjectPinUseCase(projectRepository, findProjectByIdUseCase);
    });

    it("should toggle project pin status from false to true", async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const project = makeProject({ owner, isPinned: false });

        await projectRepository.create(project);

        await toogleProjectPinUseCase.execute({
            projectId: project.getId(),
            requestUserId: owner.getId(),
        });

        const updatedProject = await projectRepository.findById(project.getId());

        expect(updatedProject?.getIsPinned()).toBe(true);
    });

    it("should toggle project pin status from true to false", async () => {
        const owner = makeUser();
        await userRepository.create(owner);

        const project = makeProject({ owner, isPinned: true });

        await projectRepository.create(project);

        await toogleProjectPinUseCase.execute({
            projectId: project.getId(),
            requestUserId: owner.getId(),
        });

        const updatedProject = await projectRepository.findById(project.getId());

        expect(updatedProject?.getIsPinned()).toBe(false);
    });

    it("should throw UnauthorizedUserError if the user does not own the project", async () => {
        const owner = makeUser();
        const unauthorizedUser = makeUser();

        await userRepository.create(owner);
        await userRepository.create(unauthorizedUser);

        const project = makeProject({ owner, isPinned: false });

        await projectRepository.create(project);

        await expect(toogleProjectPinUseCase.execute({
            projectId: project.getId(),
            requestUserId: unauthorizedUser.getId()
        })).rejects.toThrow(UnauthorizedUserError);
    });

    it("should throw an error if the project does not exist", async () => {
        const owner = makeUser();

        await userRepository.create(owner);

        await expect(toogleProjectPinUseCase.execute({
            projectId: "non-existent-project-id",
            requestUserId: owner.getId(),
        })).rejects.toThrow(ProjectNotFoundError);
    });

});
