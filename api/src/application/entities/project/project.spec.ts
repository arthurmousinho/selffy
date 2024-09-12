import { Project, ProjectProps } from './Project';
import { User } from '../user/user';
import { randomUUID } from 'crypto';

describe('Project', () => {
    let mockUser: User;
    let projectProps: ProjectProps;

    beforeEach(() => {
        mockUser = new User({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            roles: ['user'],
            projects: []
        });

        projectProps = {
            title: 'Test Project',
            description: 'A project for testing purposes',
            revenue: 1000,
            slug: '',
            createdAt: new Date(),
            tasks: [],
            status: 'in-progress',
            owner: mockUser
        };
    });

    it('should be able to create a project', () => {
        const project = new Project(projectProps);
        expect(project).toBeTruthy();
        expect(project.getTitle()).toBe('Test Project');
        expect(project.getSlug()).toBe('test-project');
    });

    it('should generate slug based on title if slug is not provided', () => {
        projectProps.slug = ''; 
        const project = new Project(projectProps);

        expect(project.getSlug()).toBe('test-project');
    });

    it('should allow updating the project title and generate a new slug', () => {
        const project = new Project(projectProps);
        project.setTitle('Updated Project Title');
        
        expect(project.getTitle()).toBe('Updated Project Title');
        expect(project.getSlug()).toBe('test-project'); 
    });

    it('should allow adding tasks to the project', () => {
        const project = new Project(projectProps);

        project.addTasks({ id: randomUUID(), name: 'Task 1', status: 'pending' });
        expect(project.getTasks().length).toBe(1);
    });

    it('should allow removing a task from the project', () => {
        const project = new Project(projectProps);
        const taskId = randomUUID();

        project.addTasks({ id: taskId, name: 'Task 1', status: 'pending' });
        project.removeTask(taskId);

        expect(project.getTasks().length).toBe(0);
    });

    it('should allow editing a task in the project', () => {
        const project = new Project(projectProps);
        const taskId = randomUUID();

        project.addTasks({ id: taskId, name: 'Task 1', status: 'pending' });
        project.editTask(taskId, { id: taskId, name: 'Updated Task', status: 'completed' });

        const updatedTask = project.getTasks().find(task => task.id === taskId);
        expect(updatedTask.name).toBe('Updated Task');
        expect(updatedTask.status).toBe('completed');
    });

    it('should change project status to finished', () => {
        const project = new Project(projectProps);
        project.finishProject();

        expect(project.getStatus()).toBe('finished');
    });

    it('should set and get the project owner', () => {
        const project = new Project(projectProps);
        const newOwner = new User({
            name: 'Jane Doe',
            email: 'jane@example.com',
            password: 'password123',
            roles: ['admin'],
            projects: []
        });

        project.setOwnerId(newOwner);
        expect(project.getOwner()).toBe(newOwner);
    });

});