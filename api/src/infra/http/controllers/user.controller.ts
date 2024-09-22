import { CreateUserUseCase } from "@application/use-cases/user/create-user/create-user.usecase";
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { SignUpUserBody } from "../dtos/signup-user-body.dto";
import { LoginUserBody } from "../dtos/login-user-body.dto";
import { AuthUserUseCase } from "@application/use-cases/user/auth-user/auth-user.usecase";
import { FindAllUsersUseCase } from "@application/use-cases/user/find-all-users/find-all-users.usecase";
import { UserViewModel } from "../view-models/user.viewmodel";
import { DeleteUserUsecase } from "@application/use-cases/user/delete-user/delete-user.usecase";

@Controller('users')
export class UserController {

    constructor(
        private createUserUseCase: CreateUserUseCase,
        private authUserUseCase: AuthUserUseCase,
        private findAllUsersUseCase: FindAllUsersUseCase,
        private deleteUserUserCase: DeleteUserUsecase
    ) {}

    @Get()
    public async getUsers() {
        const users = await this.findAllUsersUseCase.execute();
        return { users: users.map(UserViewModel.toHTTP) };
    }

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

    @Delete('/:id')
    public async delete(@Param() params: { id: string }) {
        const { id } = params;
        await this.deleteUserUserCase.execute(id);
    }

}