import { HttpException, HttpStatus } from "@nestjs/common";

export class MaximumProjectsExceededError extends HttpException {
    constructor() {
        super({
            message: ['maximum projects exceeded'],
            error: 'Forbidden',
            statusCode: HttpStatus.FORBIDDEN,
        }, HttpStatus.FORBIDDEN);
    }
}