import { Task, TaskProps } from './Task';
import { randomUUID } from 'crypto';

describe('Task', () => {
    let taskProps: TaskProps;

    beforeEach(() => {
        taskProps = {
            title: 'Test Task',
            description: 'This is a test task',
            dueDate: new Date('2024-12-31'),
            priority: 'medium',
            projectId: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
    });

    it('should be able to create a task', () => {
        const task = new Task(taskProps);

        expect(task).toBeTruthy();
        expect(task.getTitle()).toBe('Test Task');
        expect(task.getPriority()).toBe('medium');
        expect(task.getProjectId()).toBe(taskProps.projectId);
    });

    it('should generate an ID if not provided', () => {
        const task = new Task(taskProps);

        expect(task.getId()).toBeDefined();
        expect(task.getId()).toHaveLength(36);
    });

    it('should allow setting a title', () => {
        const task = new Task(taskProps);
        task.setTitle('Updated Task Title');

        expect(task.getTitle()).toBe('Updated Task Title');
    });

    it('should allow setting a description', () => {
        const task = new Task(taskProps);
        task.setDescription('Updated task description');

        expect(task.getDescription()).toBe('Updated task description');
    });

    it('should allow setting a due date', () => {
        const task = new Task(taskProps);
        const newDueDate = new Date('2024-11-15');

        task.setDueDate(newDueDate);
        expect(task.getDueDate()).toEqual(newDueDate);
    });

    it('should allow setting a priority', () => {
        const task = new Task(taskProps);
        task.setPriority('high');

        expect(task.getPriority()).toBe('high');
    });

    it('should allow setting a projectId', () => {
        const task = new Task(taskProps);
        const newProjectId = randomUUID();

        task.setProjectId(newProjectId);
        expect(task.getProjectId()).toBe(newProjectId);
    });

    it('should set createdAt if not provided', () => {
        const taskWithoutCreatedAt = new Task({ ...taskProps, createdAt: undefined });
        expect(taskWithoutCreatedAt.getCreatedAt()).toBeDefined();
        expect(taskWithoutCreatedAt.getCreatedAt()).toBeInstanceOf(Date);
    });

    it('should maintain the provided createdAt date', () => {
        const existingDate = new Date('2024-01-01');
        const taskWithCreatedAt = new Task({ ...taskProps, createdAt: existingDate });

        expect(taskWithCreatedAt.getCreatedAt()).toEqual(existingDate);
    });

    it('should update the updatedAt property', () => {
        const task = new Task(taskProps);
        const initialUpdatedAt = task.getUpdatedAt();

        jest.advanceTimersByTime(1000);
        task.update()

        expect(task.getUpdatedAt()).not.toEqual(initialUpdatedAt);
        expect(task.getUpdatedAt()).toBeInstanceOf(Date);
    });

});