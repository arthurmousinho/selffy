import { CreateUserUseCase } from "@application/use-cases/user/create-user/create-user.usecase";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserBody } from "../dtos/create-user-body.dto";

@Controller('users')
export class UserController {

    constructor(
        private createUserUseCase: CreateUserUseCase
    ) {}

    @Post()
    public async create(@Body() body: CreateUserBody) {
        const { name, email, password } = body;

        const { user } = await this.createUserUseCase.execute({
            name,
            email,
            password
        });


        return { user }
    }

}