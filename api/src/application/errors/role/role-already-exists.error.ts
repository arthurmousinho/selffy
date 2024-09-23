import { HttpException, HttpStatus } from "@nestjs/common";

export class RoleAlreadyExistsError extends HttpException {
    constructor() {
        super({
            message: ['role already exists'],
            error: 'Conflict',
            statusCode: HttpStatus.CONFLICT,
        }, HttpStatus.CONFLICT);
    }
}