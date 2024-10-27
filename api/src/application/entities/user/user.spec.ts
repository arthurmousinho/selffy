import { makeUser } from '@test/factories/user.factory';

describe('User', () => {

    it('should be able to create a user', () => {
        const user = makeUser();
        expect(user).toBeTruthy();
        expect(user.getName()).toBe('test');
        expect(user.getEmail()).toBe('test@test.com');
        expect(user.getPassword()).toBe('123456');
        expect(user.getRole()).toBe('FREE');
    });

    it('should correctly update user name', () => {
        const user = makeUser();
        user.setName('Jane Smith');
        expect(user.getName()).toBe('Jane Smith');
    });

    it('should correctly update user email', () => {
        const user = makeUser();
        user.setEmail('jane.smith@example.com');
        expect(user.getEmail()).toBe('jane.smith@example.com');
    });

    it('should correctly add and retrieve projects', () => {
        const user = makeUser();
        const project = { id: '1', name: 'Project 1' };
        user.addProject(project);
        expect(user.getProjects()).toContain(project);
    });

    it('should correctly update the updatedAt property', () => {
        const user = makeUser();
        const initialUpdatedAt = user.getUpdatedAt();

        user.update();

        expect(user.getUpdatedAt()).not.toBe(initialUpdatedAt);
        expect(user.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should correctly set and retrieve the user role', () => {
        const user = makeUser();
        user.setRole('PREMIUM');
        expect(user.getRole()).toBe('PREMIUM');
    });

});