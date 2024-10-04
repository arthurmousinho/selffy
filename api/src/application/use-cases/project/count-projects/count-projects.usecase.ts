import { ProjectRepository } from "@application/repositories/project.repository";

export class CountProjectsUseCase {

  constructor(
    private projectRepository: ProjectRepository
  ) {}

  public async execute() {
    return await this.projectRepository.count();
  }

}