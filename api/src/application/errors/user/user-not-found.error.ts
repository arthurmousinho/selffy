import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundError extends HttpException {
    constructor() {
        super({
            message: ['user not found'],
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
        }, HttpStatus.NOT_FOUND);
    }
}