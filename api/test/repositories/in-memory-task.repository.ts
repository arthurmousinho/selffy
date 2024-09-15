import { Task } from "@application/entities/task/task";
import { TaskRepository } from "@application/repositories/task.repository";

export class InMemoryTaskRepository implements TaskRepository {
    private tasks: Task[] = [];

    public async create(task: any): Promise<any> {
        this.tasks.push(task);
        return task;
    }

    public async findAll(): Promise<any[]> {
        return this.tasks;
    }

    public async findById(id: string): Promise<any> {
        return this.tasks.find(
            (task) => task.getId() === id
        );
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
        const index = this.tasks.findIndex(task => task.getId() === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }

}