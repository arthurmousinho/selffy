import { ProjectRepository } from "@domain/repositories/project.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountProjectsUseCase {

  constructor(
    private projectRepository: ProjectRepository
  ) { }

  public async execute() {
    return await this.projectRepository.count();
  }

}