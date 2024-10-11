import { HttpException, HttpStatus } from "@nestjs/common";

export class TaskDueDateInPastError extends HttpException {
    constructor() {
        super({
            message: ['task due date cannot be in the past'],
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
        }, HttpStatus.BAD_REQUEST);
    }
}