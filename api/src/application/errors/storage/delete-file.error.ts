import { HttpException, HttpStatus } from "@nestjs/common";

export class DeleteFileError extends HttpException {
    constructor() {
        super({
            message: ['fail to delete file'],
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
        }, HttpStatus.BAD_REQUEST);
    }
}