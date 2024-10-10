import { Task } from "@application/entities/task/task.entity";
import { randomUUID } from "crypto";

export function makeTask(props?: { title: string, description: string }) {
    const taskId = randomUUID();
    const dueDate = new Date('2024-12-31');
    const projectId = randomUUID();

    const newTask = new Task({
        title: props?.title ?? 'Test Task',
        description: props?.description ?? 'This is a test task',
        dueDate,
        priority: 'MEDIUM',
        projectId,
    }, taskId);

    return newTask;
}