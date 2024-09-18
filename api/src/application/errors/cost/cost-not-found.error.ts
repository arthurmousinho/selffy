export class CostNotFoundError extends Error {
    constructor() {
        super('Cost not found');
    }
}