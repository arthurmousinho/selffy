import { CreateUserUseCase } from "@application/use-cases/user/create-user/create-user.usecase";
import { HashPasswordUseCase } from "@application/use-cases/security/hash-password/hash-password.usecase";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserBody } from "../dtos/create-user-body.dto";

@Controller('users')
export class UserController {

    constructor(
        private createUserUseCase: CreateUserUseCase,
        private hashPasswordUseCase: HashPasswordUseCase
    ) {}

    @Post('/signup')
    public async create(@Body() body: CreateUserBody) {
        const { name, email, password } = body;

        const hashedPassword = await this.hashPasswordUseCase.execute(password);

        const { user } = await this.createUserUseCase.execute({
            name,
            email,
            password: hashedPassword
        });

        return { user }
    }

}