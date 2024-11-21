import { makeProject } from '@test/factories/project.factory';
import { makeUser } from '@test/factories/user.factory';
import { makeTask } from '@test/factories/task.factory';
import { makeCost } from '@test/factories/cost.factory';

describe('Project', () => {

    it('should be able to create a project with default values', () => {
        const project = makeProject();

        expect(project).toBeTruthy();
        expect(project.getTitle()).toBe('Project test');
        expect(project.getStatus()).toBe('IN_PROGRESS');
        expect(project.getTasks().length).toBe(0);
        expect(project.getCosts().length).toBe(0);
        expect(project.getIsPinned()).toBe(false);
    });

    it('should allow updating the project title', () => {
        const project = makeProject();
        const newTitle = 'Updated Project Title';
        project.setTitle(newTitle);

        expect(project.getTitle()).toBe(newTitle);
    });

    it('should allow adding tasks to the project', () => {
        const project = makeProject();
        const task = makeTask();

        project.addTask(task);

        expect(project.getTasks().length).toBe(1);
        expect(project.getTasks()[0]).toBe(task);
    });

    it('should allow removing a task from the project', () => {
        const project = makeProject();
        const task = makeTask();

        project.addTask(task);
        expect(project.getTasks().length).toBe(1);

        project.removeTask(task);
        expect(project.getTasks().length).toBe(0);
    });

    it('should change project status to finished', () => {
        const project = makeProject();
        project.finishProject();

        expect(project.getStatus()).toBe('FINISHED');
    });

    it('should set and get the project owner', () => {
        const project = makeProject();
        const newOwner = makeUser();

        project.setOwnerId(newOwner);
        expect(project.getOwner()).toBe(newOwner);
    });

    it('should update the updatedAt property', () => {
        const project = makeProject();
        const initialUpdatedAt = project.getUpdatedAt();

        project.update();

        expect(project.getUpdatedAt()).not.toBe(initialUpdatedAt);
        expect(project.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should allow adding and removing costs from the project', () => {
        const project = makeProject();
        const cost = makeCost();

        project.addCost(cost);
        expect(project.getCosts().length).toBe(1);
        expect(project.getCosts()[0]).toBe(cost);

        project.removeCost(cost);
        expect(project.getCosts().length).toBe(0);
    });

    it('should set and get the isPinned property', () => {
        const project = makeProject();

        expect(project.getIsPinned()).toBe(false);

        project.setIsPinned(true);
        expect(project.getIsPinned()).toBe(true);

        project.setIsPinned(false);
        expect(project.getIsPinned()).toBe(false);
    });

});