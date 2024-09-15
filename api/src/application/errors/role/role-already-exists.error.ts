export class RoleAlreadyExistsError extends Error {
    constructor() {
        super('Role already exists');
    }
}