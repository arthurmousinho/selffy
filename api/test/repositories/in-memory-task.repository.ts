import { Task, TaskPriority, TaskStatus } from "src/domain/entities/task/task.entity";
import { TaskRepository } from "@domain/repositories/task.repository";
import { Pageable } from "@application/shared/pageable.type";
import { InMemoryProjectRepository } from "./in-memory-project.repository";

export class InMemoryTaskRepository implements TaskRepository {

    private projectRepository = new InMemoryProjectRepository();
    private tasks: Task[] = [];

    public async create(task: any): Promise<void> {
        this.tasks.push(task);
    }

    public async createMany(tasks: any[]): Promise<void> {
        this.tasks.push(...tasks);
    }

    public async findAll(page: number, limit: number): Promise<Pageable<Task>> {
        const tasks = this.tasks.slice((page - 1) * limit, page * limit);
        return {
            data: tasks,
            meta: {
                page,
                limit,
                total: this.tasks.length,
                totalPages: Math.ceil(this.tasks.length / limit)
            }
        }
    }

    public async findByUserId(userId: string): Promise<Task[]> {
        const projects = await this.projectRepository.findAll(1, 1000);

        console.log(projects);

        const userProjects = projects.data.filter(project => project.getOwner().getId() === userId);
        const userTasks = userProjects.map(project => project.getTasks()).flat();
        return userTasks;
    }

    public async findById(id: string): Promise<Task | null> {
        const task = this.tasks.find(
            (task) => task.getId() === id
        );
        return task ?? null;
    }

    public async update(task: any): Promise<void> {
        const index = this.tasks.findIndex(
            (item) => item.getId() === task.getId()
        )
        if (index !== -1) {
            this.tasks[index] = task;
        }
    }

    public async delete(id: string) {
        const index = this.tasks.findIndex(
            (task) => task.getId() === id
        );
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }

    public async findManyByTitle(params: { title: string, page: number, limit: number }): Promise<Pageable<Task>> {
        const tasks = this.tasks.filter(
            (task) => task.getTitle().toLowerCase().includes(params.title.toLowerCase())
        );
        const pageableTasks = tasks.slice((params.page - 1) * params.limit, params.page * params.limit);
        return {
            data: pageableTasks,
            meta: {
                page: params.page,
                limit: params.limit,
                total: tasks.length,
                totalPages: Math.ceil(tasks.length / params.limit)
            }
        }
    }

    public async findManyByProjectId(projectId: string): Promise<Task[]> {
        return this.tasks.filter(
            (task) => task.getProjectId() === projectId
        );
    }

    public async count(): Promise<number> {
        return this.tasks.length;
    }

    public async countByStatus(status: TaskStatus): Promise<number> {
        return this.tasks.filter(
            (task) => task.getStatus() === status
        ).length;
    }

    public async countByPriority(priority: TaskPriority): Promise<number> {
        return this.tasks.filter(
            (task) => task.getPriority() === priority
        ).length;
    }

    public async countTasksCreatedAfter(date: Date): Promise<number> {
        return this.tasks.filter(
            (task) => task.getCreatedAt() > date
        ).length;
    }

}