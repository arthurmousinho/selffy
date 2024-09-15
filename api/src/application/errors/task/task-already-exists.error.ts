export class TaskAlreadyExistsError extends Error {
    constructor() {
        super('Task already exists');
    }
}