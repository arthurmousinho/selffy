export class CostAlreadyExistsError extends Error {
    constructor() {
        super('Cost already exists');
    }
}