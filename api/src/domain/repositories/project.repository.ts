import { Project, ProjectStatus } from "src/domain/entities/project/project.entity";
import { Pageable } from "@application/shared/pageable.type";

export abstract class ProjectRepository {
    abstract create(project: Project): Promise<void>;

    abstract createMany(projects: Project[]): Promise<void>;

    abstract findAll(page: number, limit: number): Promise<Pageable<Project>>;

    abstract findById(id: string): Promise<Project | null>;

    abstract update(project: Project): Promise<void>;

    abstract delete(id: string): Promise<void>;

    abstract count(): Promise<number>;

    abstract findManyByTitle(params: { 
        title: string, 
        page: number, 
        limit: number 
    }): Promise<Pageable<Project>>;

    abstract findByOwnerId(params: { 
        ownerId: string, 
        page?: number, 
        limit?: number
    }): Promise<Pageable<Project>>;

    abstract findByStatus(status: ProjectStatus): Promise<Project[]>;

    abstract countByStatus(status: ProjectStatus): Promise<number>;

    abstract countByOwnerId(ownerId: string): Promise<number>;

    abstract countProjectsCreatedAfter(date: Date): Promise<number>;

    abstract sumRevenues(): Promise<number>;
}