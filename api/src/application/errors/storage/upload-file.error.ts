import { HttpException, HttpStatus } from "@nestjs/common";

export class UploadFileError extends HttpException {
    constructor() {
        super({
            message: ['fail to upload file'],
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
        }, HttpStatus.BAD_REQUEST);
    }
}