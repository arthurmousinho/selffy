import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super({
      message: ['email already in use'],
      error: 'Conflict',
      statusCode: HttpStatus.CONFLICT,
    }, HttpStatus.CONFLICT);
  }
}