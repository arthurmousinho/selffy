import { Project } from './project';
import { User } from '../user/user'; 

describe('Project', () => {

    let user: User;

    beforeEach(() => {
        user = new User({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: 'securepassword',
            roles: ['admin'],
            createdAt: new Date(),
            projects: []
        });
    });

    it('should be able to create a project', () => {
        const project = new Project({
            title: 'New Project',
            description: 'Project Description',
            revenue: 10000,
            slug: 'new-project',
            tasks: [],
            status: 'ongoing',
            owner: user
        });
        expect(project).toBeTruthy();
        expect(project.getTitle()).toBe('New Project');
        expect(project.getDescription()).toBe('Project Description');
        expect(project.getRevenue()).toBe(10000);
        expect(project.getSlug()).toBe('new-project');
        expect(project.getTasks()).toEqual([]);
        expect(project.getStatus()).toBe('ongoing');
        expect(project.getOwner()).toBe(user);
    });

    it('should correctly update project title', () => {
        const project = new Project({
            title: 'Old Title',
            description: 'Description',
            revenue: 5000,
            slug: 'old-title',
            tasks: [],
            status: 'completed',
            owner: user
        });
        project.setTitle('Updated Title');
        expect(project.getTitle()).toBe('Updated Title');
    });

    it('should correctly update project description', () => {
        const project = new Project({
            title: 'Project Title',
            description: 'Old Description',
            revenue: 7000,
            slug: 'project-title',
            tasks: [],
            status: 'ongoing',
            owner: user
        });
        project.setDescription('New Description');
        expect(project.getDescription()).toBe('New Description');
    });

    it('should correctly add a task', () => {
        const project = new Project({
            title: 'Project Title',
            description: 'Description',
            revenue: 8000,
            slug: 'project-title',
            tasks: [],
            status: 'ongoing',
            owner: user
        });
        const task = { id: 'task1', name: 'Task 1' };
        project.addTasks(task);
        expect(project.getTasks()).toContain(task);
    });

    it('should correctly remove a task', () => {
        const project = new Project({
            title: 'Project Title',
            description: 'Description',
            revenue: 8000,
            slug: 'project-title',
            tasks: [{ id: 'task1', name: 'Task 1' }],
            status: 'ongoing',
            owner: user
        });
        project.removeTask('task1');
        expect(project.getTasks()).not.toContainEqual({ id: 'task1', name: 'Task 1' });
    });

    it('should correctly edit a task', () => {
        const project = new Project({
            title: 'Project Title',
            description: 'Description',
            revenue: 8000,
            slug: 'project-title',
            tasks: [{ id: 'task1', name: 'Old Task' }],
            status: 'ongoing',
            owner: user
        });
        const newTask = { id: 'task1', name: 'Updated Task' };
        project.editTask('task1', newTask);
        expect(project.getTasks()).toContainEqual(newTask);
    });

    it('should correctly update project status', () => {
        const project = new Project({
            title: 'Project Title',
            description: 'Description',
            revenue: 8000,
            slug: 'project-title',
            tasks: [],
            status: 'ongoing',
            owner: user
        });
        project.setStatus('completed');
        expect(project.getStatus()).toBe('completed');
    });

    it('should correctly update project owner', () => {
        const newUser = new User({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'anotherpassword',
            roles: [],
            projects: []
        });
        const project = new Project({
            title: 'Project Title',
            description: 'Description',
            revenue: 8000,
            slug: 'project-title',
            tasks: [],
            status: 'ongoing',
            owner: user
        });
        project.setOwnerId(newUser);
        expect(project.getOwner()).toBe(newUser);
    });

});
