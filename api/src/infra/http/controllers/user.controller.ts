import { CreateUserUseCase } from "@application/use-cases/user/create-user/create-user.usecase";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SignUpUserBody } from "../dtos/user/signup-user-body.dto";
import { LoginUserBody } from "../dtos/user/login-user-body.dto";
import { AuthUserUseCase } from "@application/use-cases/user/auth-user/auth-user.usecase";
import { FindAllUsersUseCase } from "@application/use-cases/user/find-all-users/find-all-users.usecase";
import { UserViewModel } from "../view-models/user.viewmodel";
import { DeleteUserUsecase } from "@application/use-cases/user/delete-user/delete-user.usecase";
import { SearchUserByNameUseCase } from "@application/use-cases/user/search-user-by-name/search-user-by-name.usecase";
import { UpdateUserBody } from "../dtos/user/update-user-body.dto";
import { UpdateUserUseCase } from "@application/use-cases/user/update-user/update-user.usecase";

@Controller('users')
export class UserController {

    constructor(
        private createUserUseCase: CreateUserUseCase,
        private authUserUseCase: AuthUserUseCase,
        private findAllUsersUseCase: FindAllUsersUseCase,
        private deleteUserUserCase: DeleteUserUsecase,
        private searchUserByNameUseCase: SearchUserByNameUseCase,
        private updateUserUseCase: UpdateUserUseCase
    ) {}

    @Get()
    public async getUsers() {
        const users = await this.findAllUsersUseCase.execute();
        return { users: users.map(UserViewModel.toHTTP) };
    }

    @Get(':name')
    public async searchByName(@Param('name') name: string) {
        const usersFound = await this.searchUserByNameUseCase.execute(name);
        return { users: usersFound.map(UserViewModel.toHTTP) };
    }

    @Post('/signup')
    public async signup(@Body() body: SignUpUserBody) {
        const { name, email, password, type } = body;

        const { user } = await this.createUserUseCase.execute({
            name,
            email,
            password,
            type
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

    @Put()
    public async update(@Body() body: UpdateUserBody) {
        const { id ,name, email } = body;
        await this.updateUserUseCase.execute({
            id,
            name,
            email
        });
    }

    @Delete(':id')
    public async delete(@Param('id') id: string) {
        await this.deleteUserUserCase.execute(id);
    }

}