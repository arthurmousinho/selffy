import { CreateUserUseCase } from "@application/use-cases/user/create-user/create-user.usecase";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { SignUpUserBody } from "../dtos/user/signup-user-body.dto";
import { LoginUserBody } from "../dtos/user/login-user-body.dto";
import { AuthUserUseCase } from "@application/use-cases/user/auth-user/auth-user.usecase";
import { FindAllUsersUseCase } from "@application/use-cases/user/find-all-users/find-all-users.usecase";
import { UserViewModel } from "../view-models/user.viewmodel";
import { DeleteUserUsecase } from "@application/use-cases/user/delete-user/delete-user.usecase";
import { SearchUserByNameUseCase } from "@application/use-cases/user/search-user-by-name/search-user-by-name.usecase";
import { UpdateUserBody } from "../dtos/user/update-user-body.dto";
import { UpdateUserUseCase } from "@application/use-cases/user/update-user/update-user.usecase";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "../guards/role.guard";
import { FindUserByIdUseCase } from "@application/use-cases/user/find-user-by-id/find-user-by-id.usecase";
import { GetUserDashboardUseCase } from "@application/use-cases/user/get-user-dashboard/get-user-dashboard.usecase";
import { UserFromToken } from "../decorators/user-from-token.decorator";

@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(
        private createUserUseCase: CreateUserUseCase,
        private authUserUseCase: AuthUserUseCase,
        private findAllUsersUseCase: FindAllUsersUseCase,
        private deleteUserUserCase: DeleteUserUsecase,
        private searchUserByNameUseCase: SearchUserByNameUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private findUserByIdUseCase: FindUserByIdUseCase,
        private getUserDashboardUseCase: GetUserDashboardUseCase
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard, new RoleGuard('ADMIN'))
    public async getUsers(@Query('page') page = 1, @Query('limit') limit = 10) {
        const pageblaUsers = await this.findAllUsersUseCase.execute(
            Number(page),
            Number(limit)
        );
        return {
            users: pageblaUsers.data.map(UserViewModel.toHTTP),
            meta: pageblaUsers.meta
        };
    }

    @Get('/dashboard/:id')
    public async getUserDashboard(
        @Param('id') id: string,
        @UserFromToken() userFromToken: UserFromToken
    ) {
        const dashboard = await this.getUserDashboardUseCase.execute({
            requestUserId: userFromToken.id,
            ownerId: id
        });
        return dashboard;
    }

    @Get('/name/:name')
    @UseGuards(JwtAuthGuard, new RoleGuard('ADMIN'))
    public async searchByName(
        @Param('name') name: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        const pageableUsers = await this.searchUserByNameUseCase.execute({
            name,
            page: Number(page),
            limit: Number(limit)
        });
        return {
            users: pageableUsers.data.map(UserViewModel.toHTTP),
            meta: pageableUsers.meta
        };
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    public async getById(@Param('id') id: string) {
        const user = await this.findUserByIdUseCase.execute(id);
        return { user: UserViewModel.toHTTP(user) };
    }

    @Post('/signup')
    public async signup(@Body() body: SignUpUserBody) {
        const { name, email, password, role } = body;

        const { user } = await this.createUserUseCase.execute({
            name,
            email,
            password,
            role
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

    @Put(':id')
    @UseGuards(JwtAuthGuard, new RoleGuard('ADMIN'))
    public async update(
        @Param('id') id: string,
        @Body() body: UpdateUserBody,
    ) {
        const { name, email, role } = body;
        await this.updateUserUseCase.execute({
            id,
            name,
            email,
            role
        });
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @UseGuards(JwtAuthGuard, new RoleGuard('ADMIN'))
    public async delete(@Param('id') id: string) {
        await this.deleteUserUserCase.execute(id);
    }

}