import { HttpException, HttpStatus } from "@nestjs/common";

export class CostNotFoundError extends HttpException {
    constructor() {
        super({
            message: ['cost not found'],
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
        }, HttpStatus.NOT_FOUND);
    }
}
