import { Task } from "@application/entities/task/task.entity";

export abstract class TaskRepository {
    abstract create(task: Task): Promise<void>;
    abstract findAll(): Promise<Task[]>;
    abstract findById(id: string): Promise<Task | null>;
    abstract update(task: Task): Promise<void>;
    abstract delete(id: string): Promise<void>;
}