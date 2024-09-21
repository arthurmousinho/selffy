import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super({
      message: ['email already in use'],
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    }, HttpStatus.BAD_REQUEST);
  }
}