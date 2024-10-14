import { Project, ProjectStatus } from "@application/entities/project/project.entity";

export abstract class ProjectRepository {
    abstract create(project: Project): Promise<void>;
    abstract findAll(): Promise<Project[]>;
    abstract findById(id: string): Promise<Project | null>;
    abstract update(project: Project): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract count(): Promise<number>;
    abstract findManyByTitle(title: string): Promise<Project[]>;
    abstract findByStatus(status: ProjectStatus): Promise<Project[]>;
    abstract countByStatus(status: ProjectStatus): Promise<number>;
    abstract sumRevenues(): Promise<number>;
}