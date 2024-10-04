import { HttpException, HttpStatus } from "@nestjs/common";

export class ProjectNotFoundError extends HttpException {
    constructor() {
        super({
            message: ['project not found'],
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
        }, HttpStatus.NOT_FOUND);
    }
}