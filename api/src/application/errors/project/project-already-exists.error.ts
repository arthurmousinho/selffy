export class ProjectAlreadyExistsError extends Error {
    constructor() {
        super('Project already exists');
    }
}