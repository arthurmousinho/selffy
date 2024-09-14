import { Role, RoleProps } from './role';

describe('Role', () => {
    let roleProps: RoleProps;

    beforeEach(() => {
        roleProps = {
            key: 'admin',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        };
    });

    it('should be able to create a role', () => {
        const role = new Role(roleProps);

        expect(role).toBeTruthy();
        expect(role.getKey()).toBe('admin');
    });

    it('should generate an ID if not provided', () => {
        const role = new Role(roleProps);

        expect(role.getId()).toBeDefined();
        expect(role.getId()).toHaveLength(36);
    });

    it('should allow setting a key', () => {
        const role = new Role(roleProps);
        role.setKey('user');

        expect(role.getKey()).toBe('user');
    });

    it('should set createdAt if not provided', () => {
        const roleWithoutCreatedAt = new Role({ ...roleProps, createdAt: undefined });
        expect(roleWithoutCreatedAt.getCreatedAt()).toBeDefined();
        expect(roleWithoutCreatedAt.getCreatedAt()).toBeInstanceOf(Date);
    });

    it('should maintain the provided createdAt date', () => {
        const existingDate = new Date('2024-01-01');
        const roleWithCreatedAt = new Role({ ...roleProps, createdAt: existingDate });

        expect(roleWithCreatedAt.getCreatedAt()).toEqual(existingDate);
    });

    it('should update the updatedAt property', () => {
        const role = new Role(roleProps);
        const initialUpdatedAt = role.getUpdatedAt();

        jest.advanceTimersByTime(1000);
        role.update();

        expect(role.getUpdatedAt()).not.toEqual(initialUpdatedAt);
        expect(role.getUpdatedAt()).toBeInstanceOf(Date);
    });

});