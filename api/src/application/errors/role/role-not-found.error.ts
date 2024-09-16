export class RoleNotFoundError extends Error {
    constructor() {
        super('Role not found');
    }
}