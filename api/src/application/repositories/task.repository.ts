import { Task, TaskPriority, TaskStatus } from "@application/entities/task/task.entity";

export abstract class TaskRepository {
    abstract create(task: Task): Promise<void>;
    abstract createMany(tasks: Task[]): Promise<void>;
    abstract findAll(): Promise<Task[]>;
    abstract findById(id: string): Promise<Task | null>;
    abstract update(task: Task): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findManyByTitle(title: string): Promise<Task[]>;
    abstract count(): Promise<number>;
    abstract countByStatus(status: TaskStatus): Promise<number>;
    abstract countByPriority(priority: TaskPriority): Promise<number>;
}