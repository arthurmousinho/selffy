export class ProjectNotFoundError extends Error {
    constructor() {
        super('Project not found');
    }
}