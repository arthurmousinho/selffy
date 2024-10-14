import { Project, ProjectStatus } from "@application/entities/project/project.entity";
import { ProjectRepository } from "@application/repositories/project.repository";

export class InMemoryProjectRepository implements ProjectRepository {

    private projects: Project[] = [];

    public async create(project: Project): Promise<void> {
        this.projects.push(project);
    }

    public async findAll(): Promise<Project[]> {
        return this.projects;
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

    public async findManyByTitle(title: string): Promise<Project[]> {
        return this.projects.filter(
            (project) => project.getTitle().includes(title)
        );
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