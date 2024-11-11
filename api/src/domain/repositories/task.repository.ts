import { Task, TaskPriority, TaskStatus } from "src/domain/entities/task/task.entity";
import { Pageable } from "@application/shared/pageable.type";

export abstract class TaskRepository {
    abstract create(task: Task): Promise<void>;
    abstract createMany(tasks: Task[]): Promise<void>;
    abstract findAll(page: number, limit: number): Promise<Pageable<Task>>;
    abstract findById(id: string): Promise<Task | null>;
    abstract update(task: Task): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findManyByTitle(params: { title: string, page: number, limit: number }): Promise<Pageable<Task>>;
    abstract count(): Promise<number>;
    abstract countByStatus(status: TaskStatus): Promise<number>;
    abstract countByPriority(priority: TaskPriority): Promise<number>;
    abstract countTasksCreatedAfter(date: Date): Promise<number>;
}