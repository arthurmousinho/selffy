import { HttpException, HttpStatus } from "@nestjs/common";

export class UnauthorizedUserError extends HttpException {
    constructor() {
        super({
            message: 'unauthorized user',
            error: 'Unauthorized',
            statusCode: HttpStatus.UNAUTHORIZED,
        }, HttpStatus.CONFLICT);
    }
}