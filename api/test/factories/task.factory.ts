import { Task, TaskPriority } from "@application/entities/task/task.entity";
import { randomUUID } from "crypto";

export function makeTask(props?: { 
    title?: string, 
    description?: string, 
    dueDate?: Date, 
    priority?: TaskPriority, 
    projectId?: string 
}) {
    const taskId = randomUUID();
    
    const newTask = new Task({
        title: props?.title ?? 'Test Task',
        description: props?.description ?? 'This is a test task',
        dueDate: props?.dueDate ?? new Date('2024-12-31'),
        priority: props?.priority ?? 'MEDIUM',
        projectId: props?.projectId ?? randomUUID(),
    }, taskId);

    return newTask;
}
