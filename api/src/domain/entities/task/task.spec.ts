import { makeTask } from '@test/factories/task.factory';
import { randomUUID } from 'crypto';

describe('Task', () => {

    it('should be able to create a task', () => {
        const task = makeTask();
        expect(task).toBeTruthy();
    });

    it('should generate an ID if not provided', () => {
        const task = makeTask();

        expect(task.getId()).toBeDefined();
        expect(task.getId()).toHaveLength(36);
    });

    it('should allow setting a title', () => {
        const task = makeTask();
        task.setTitle('Updated Task Title');

        expect(task.getTitle()).toBe('Updated Task Title');
    });

    it('should allow setting a description', () => {
        const task = makeTask();
        task.setDescription('Updated task description');

        expect(task.getDescription()).toBe('Updated task description');
    });

    it('should allow setting a due date', () => {
        const task = makeTask();
        const newDueDate = new Date('2024-11-15');

        task.setDueDate(newDueDate);
        expect(task.getDueDate()).toEqual(newDueDate);
    });

    it('should allow setting a priority', () => {
        const task = makeTask();
        task.setPriority('HIGH');

        expect(task.getPriority()).toBe('HIGH');
    });

    it('should allow setting a projectId', () => {
        const task = makeTask();
        const newProjectId = randomUUID();

        task.setProjectId(newProjectId);
        expect(task.getProjectId()).toBe(newProjectId);
    });

    it('should set completedAt when completed', () => {
        const task = makeTask();
        const initialCompletedAt = task.getCompletedAt();

        task.complete();

        expect(task.getCompletedAt()).toBeDefined();
        expect(task.getCompletedAt()).toBeInstanceOf(Date);
        expect(task.getCompletedAt()).not.toEqual(initialCompletedAt);
    });

    it('should default to PENDING status when created', () => {
        const task = makeTask();

        expect(task.getStatus()).toBe('PENDING');
    });

    it('should allow setting the status to COMPLETED', () => {
        const task = makeTask();

        task.setStatus('COMPLETED');
        expect(task.getStatus()).toBe('COMPLETED');
    });

    it('should allow setting the status back to PENDING', () => {
        const task = makeTask();

        task.setStatus('COMPLETED');
        expect(task.getStatus()).toBe('COMPLETED');

        task.setStatus('PENDING');
        expect(task.getStatus()).toBe('PENDING');
    });

});