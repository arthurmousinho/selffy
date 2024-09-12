import { User } from './user';

describe('User', () => {

    it('should be able to create a user', () => {
        const user = new User({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword',
            roles: ['user.edit'],
            projects: [],
        });
        expect(user).toBeTruthy();
        expect(user.getName()).toBe('John Doe');
        expect(user.getEmail()).toBe('john.doe@example.com');
        expect(user.getPassword()).toBe('securepassword');
        expect(user.getRoles()).toEqual(['user.edit']);
        expect(user.getCreatedAt()).toBeInstanceOf(Date);
        expect(user.getProjects()).toEqual([]);
    });

    it('should correctly update user name', () => {
        const user = new User({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: 'anotherpassword',
            roles: [],
            projects: [],
        });
        user.setName('Jane Smith');
        expect(user.getName()).toBe('Jane Smith');
    });

    it('should correctly update user email', () => {
        const user = new User({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: 'anotherpassword',
            roles: [],
            projects: []
        });
        user.setEmail('jane.smith@example.com');
        expect(user.getEmail()).toBe('jane.smith@example.com');
    });

    it('should correctly add and retrieve roles', () => {
        const user = new User({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword',
            roles: [],
            projects: []
        });
        user.addRole('admin');
        expect(user.getRoles()).toContain('admin');
    });

    it('should correctly add and retrieve projects', () => {
        const user = new User({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword',
            roles: [],
            projects: []
        });
        const project = { id: '1', name: 'Project 1' };
        user.addProject(project);
        expect(user.getProjects()).toContain(project);
    });

});