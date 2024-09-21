import { CreateUserUseCase } from "@application/use-cases/user/create-user/create-user.usecase";
import { Body, Controller, Post } from "@nestjs/common";
import { SignUpUserBody } from "../dtos/signup-user-body.dto";
import { LoginUserBody } from "../dtos/login-user-body.dto";
import { AuthUserUseCase } from "@application/use-cases/user/auth-user/auth-user.usecase";

@Controller('users')
export class UserController {

    constructor(
        private createUserUseCase: CreateUserUseCase,
        private authUserUseCase: AuthUserUseCase
    ) { }

    @Post('/signup')
    public async signup(@Body() body: SignUpUserBody) {
        const { name, email, password } = body;

        const { user } = await this.createUserUseCase.execute({
            name,
            email,
            password
        });

        return { user }
    }

    @Post('/login')
    public async login(@Body() body: LoginUserBody) {
        const { email, password } = body;

        const token = await this.authUserUseCase.execute({
            email,
            password
        });

        return { token };
    }


}