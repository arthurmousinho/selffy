import { makeRole } from '@test/factories/role.factory';

describe('Role', () => {

    it('should be able to create a role', () => {
        const role = makeRole();

        expect(role).toBeTruthy();
        expect(role.getKey()).toBe('user.create');
    });

    it('should generate an ID if not provided', () => {
        const role = makeRole();

        expect(role.getId()).toBeDefined();
        expect(role.getId()).toHaveLength(36);
    });

    it('should allow setting a key', () => {
        const role = makeRole();
        role.setKey('user');

        expect(role.getKey()).toBe('user');
    });

    it('should update the updatedAt property', () => {
        const role = makeRole();
        const initialUpdatedAt = role.getUpdatedAt();

        jest.advanceTimersByTime(1000);
        role.update();

        expect(role.getUpdatedAt()).not.toEqual(initialUpdatedAt);
        expect(role.getUpdatedAt()).toBeInstanceOf(Date);
    });

});