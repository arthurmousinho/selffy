import { ProjectRepository } from "@application/repositories/project.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchProjectByTitleUseCase {

  constructor(
    private projectRepository: ProjectRepository,
  ) {}

  public async execute(title: string) {
    const projectsFound = await this.projectRepository.findManyByTitle(title);
    return projectsFound;
  }

}