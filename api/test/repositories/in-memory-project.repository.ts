import { Project, ProjectStatus } from "@application/entities/project/project.entity";
import { ProjectRepository } from "@application/repositories/project.repository";
import { Pageable } from "@application/types/pageable.type";

export class InMemoryProjectRepository implements ProjectRepository {

    private projects: Project[] = [];

    public async create(project: Project): Promise<void> {
        this.projects.push(project);
    }

    public async createMany(projects: Project[]): Promise<void> {
        this.projects.push(...projects);
    }

    public async findAll(page: number, limit: number): Promise<Pageable<Project>> {
        const projects = this.projects.slice((page - 1) * limit, page * limit);
        return {
            data: projects,
            meta: {
                page,
                limit,
                total: this.projects.length,
                totalPages: Math.ceil(this.projects.length / limit)
            }
        }
    }

    public async findById(id: string): Promise<Project | null> {
        const project = this.projects.find(
            (project) => project.getId() === id
        );
        return project ?? null;
    }

    public async update(project: Project): Promise<void> {
        const index = this.projects.findIndex(
            (item) => item.getId() === project.getId()
        );
        if (index !== -1) {
            this.projects[index] = project;
        }
    }

    public async delete(id: string): Promise<void> {
        const index = this.projects.findIndex(
            (item) => item.getId() === id
        );
        if (index !== -1) {
            this.projects.splice(index, 1);
        }
    }

    public async count(): Promise<number> {
        return this.projects.length;
    }

    public async countProjectsCreatedAfter(date: Date): Promise<number> {
        return this.projects.filter(
            (project) => project.getCreatedAt() > date
        ).length;
    }

    public async findManyByTitle(params: { title: string, page: number, limit: number }): Promise<Pageable<Project>> {
        const projects = this.projects.filter(
            (project) => project.getTitle().toLowerCase().includes(params.title.toLowerCase())
        );
        const pageableProjects = projects.slice((params.page - 1) * params.limit, params.page * params.limit);
        return {
            data: pageableProjects,
            meta: {
                page: params.page,
                limit: params.limit,
                total: projects.length,
                totalPages: Math.ceil(projects.length / params.limit)
            }
        }
    }

    public async countByStatus(status: ProjectStatus): Promise<number> {
        return this.projects.filter(
            (project) => project.getStatus() === status
        ).length;
    }

    public async findByStatus(status: ProjectStatus): Promise<Project[]> {
        return this.projects.filter(
            (project) => project.getStatus() === status
        );
    }

    public async sumRevenues(): Promise<number> {
        return this.projects.reduce((total, project) => total + project.getRevenue(), 0);
    }

}