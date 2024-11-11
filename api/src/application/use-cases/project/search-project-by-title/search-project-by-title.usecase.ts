import { Project } from "src/domain/entities/project/project.entity";
import { ProjectRepository } from "@domain/repositories/project.repository";
import { Pageable } from "@application/shared/pageable.type";
import { Injectable } from "@nestjs/common";

interface SearchProjectByTitleUseCaseRequest {
  title: string;
  page: number;
  limit: number;
}

@Injectable()
export class SearchProjectByTitleUseCase {

  constructor(
    private projectRepository: ProjectRepository,
  ) { }

  public async execute(request: SearchProjectByTitleUseCaseRequest): Promise<Pageable<Project>> {
    if (!request.page || request.page < 1) {
      request.page = 1;
    }

    if (!request.limit || request.limit < 1) {
      request.limit = 10;
    }

    const projectsFound = await this.projectRepository.findManyByTitle(request);
    return projectsFound;
  }

}