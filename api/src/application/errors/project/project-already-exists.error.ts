import { HttpException, HttpStatus } from "@nestjs/common";

export class ProjectAlreadyExistsError extends HttpException {
    constructor() {
        super({
            message: ['project already exists'],
            error: 'Conflict',
            statusCode: HttpStatus.CONFLICT,
        }, HttpStatus.CONFLICT);
    }
}