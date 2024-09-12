import { Task } from '../task/task';
import { User } from '../user/user';
import { Project, ProjectProps } from './Project';

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

    it('should allow updating the project title and keep the slug', () => {
        const project = new Project(projectProps);
        project.setTitle('Updated Project Title');
        
        expect(project.getTitle()).toBe('Updated Project Title');
        expect(project.getSlug()).toBe('test-project'); 
    });

    it('should allow adding tasks to the project', () => {
        const project = new Project(projectProps);

        const task = new Task({
            title: 'Task 1',
            description: 'First task',
            dueDate: new Date(),
            priority: 'medium',
            projectId: project.getId(),
        });

        project.addTask(task);

        expect(project.getTasks().length).toBe(1);
        expect(project.getTasks()[0].getTitle()).toBe('Task 1');
    });

    it('should allow removing a task from the project', () => {
        const project = new Project(projectProps);

        const task = new Task({
            title: 'Task 1',
            description: 'First task',
            dueDate: new Date(),
            priority: 'medium',
            projectId: project.getId(),
            createdAt: new Date()
        });

        project.addTask(task);
        expect(project.getTasks().length).toBe(1);

        project.removeTask(task);
        expect(project.getTasks().length).toBe(0);
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