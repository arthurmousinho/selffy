import { Task } from "@application/entities/task/task.entity";
import { TaskRepository } from "@application/repositories/task.repository";

export class InMemoryTaskRepository implements TaskRepository {

    private tasks: Task[] = [];

    public async create(task: any): Promise<void> {
        this.tasks.push(task);
    }

    public async findAll(): Promise<Task[]> {
        return this.tasks;
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

}