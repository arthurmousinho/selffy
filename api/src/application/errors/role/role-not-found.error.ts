import { HttpException, HttpStatus } from "@nestjs/common";

export class RoleNotFoundError extends HttpException {
    constructor() {
        super({
            message: ['role not found'],
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
        }, HttpStatus.NOT_FOUND);
    }
}