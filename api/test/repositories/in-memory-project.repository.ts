import { Project } from "@application/entities/project/project";
import { ProjectRepository } from "@application/repositories/project.repository";

export class InMemoryProjectRepository implements ProjectRepository {
    
    private projects: Project[] = [];

    async create(project: Project): Promise<void> {
        this.projects.push(project);
    }

    async findAll(): Promise<Project[]> {
        return this.projects;
    }

    async findById(id: string): Promise<Project | null> {
        const project = this.projects.find(project => project.getId() === id);
        return project ?? null;
    }

    async update(project: Project): Promise<void> {
        const index = this.projects.findIndex(p => p.getId() === project.getId());
        if (index !== -1) {
            this.projects[index] = project;
        }
    }

    async delete(id: string): Promise<void> {
        const index = this.projects.findIndex(project => project.getId() === id);
        if (index !== -1) {
            this.projects.splice(index, 1);
        }
    }

}