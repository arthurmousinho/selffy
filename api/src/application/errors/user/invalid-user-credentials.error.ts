import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidUserCredentialsError extends HttpException {
    constructor() {
        super({
            message: ['invalid credentials'],
            error: 'Unauthorized',
            statusCode: HttpStatus.UNAUTHORIZED,
        }, HttpStatus.UNAUTHORIZED);
    }
}