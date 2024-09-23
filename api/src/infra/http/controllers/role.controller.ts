import { CreateRoleUseCase } from "@application/use-cases/role/create-role/create-role.usecase";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateRoleBody } from "../dtos/role/create-role-body.dto";


@Controller('roles')
export class RoleController {

    constructor(
        private createRoleUseCase: CreateRoleUseCase
    ) {}

    @Post()
    public async create(@Body() body: CreateRoleBody) {
        const { key, userTypes } = body;

        await this.createRoleUseCase.execute({
            key,
            userTypes
        });
    }

}