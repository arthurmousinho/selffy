import { Task } from "@application/entities/task/task";
import { randomUUID } from "crypto";

export function makeTask() {
    const taskId = randomUUID();
    const dueDate = new Date('2024-12-31');
    const projectId = randomUUID();

    const newTask = new Task({
        title: 'Test Task',
        description: 'This is a test task',
        dueDate,
        priority: 'medium',
        projectId,
    }, taskId);

    return newTask;
}