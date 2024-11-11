import { TaskPriority, TaskStatus } from "src/domain/entities/task/task.entity";

function getRandomDueDate(): Date {
    const today = new Date();
    const randomDay = Math.floor(Math.random() * 30) + 1;
    return new Date(today.getFullYear(), today.getMonth(), randomDay);

}

function getRandomPriority(): TaskPriority {
    const priorities = ['LOW', 'MEDIUM', 'HIGH'];
    const randomIndex = Math.floor(Math.random() * priorities.length);
    return priorities[randomIndex] as TaskPriority;
}

function getRandomStatus(): TaskStatus {
    const statuses = ['PENDING', 'COMPLETED'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex] as TaskStatus;
}

function getRandomCompletedAt(): Date {
    const today = new Date();
    const randomDay = Math.floor(Math.random() * 30) + 1;
    return new Date(today.getFullYear(), today.getMonth(), randomDay);
}

export const MOCK_TASKS = Array.from({ length: 30 }).map((_, index) => ({
    title: `Task ${index + 1}`,
    description: `Description for Task ${index + 1}`,
    dueDate: getRandomDueDate(),
    priority: getRandomPriority(),
    status: getRandomStatus(),
    completedAt: getRandomCompletedAt()
}))