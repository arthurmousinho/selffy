import { HttpException, HttpStatus } from "@nestjs/common";

export class ProjectAlreadyFinishedError extends HttpException {
    constructor() {
        super({
            message: ['project already finished'],
            error: 'Conflict',
            statusCode: HttpStatus.CONFLICT,
        }, HttpStatus.CONFLICT);
    }
} 