import { CreateRoleUseCase } from "@application/use-cases/role/create-role/create-role.usecase";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateRoleBody } from "../dtos/role/create-role-body.dto";
import { FindAllRolesUseCase } from "@application/use-cases/role/find-all-roles/find-all-roles.usecase";
import { RoleViewModel } from "../view-models/role.viewmodel";


@Controller('roles')
export class RoleController {

    constructor(
        private createRoleUseCase: CreateRoleUseCase,
        private findAllRolesUseCase: FindAllRolesUseCase
    ) {}

    @Get()
    public async getRoles() {
        const users = await this.findAllRolesUseCase.execute();
        return { users: users.map(RoleViewModel.toHTTP) };
    }

    @Post()
    public async create(@Body() body: CreateRoleBody) {
        const { key, userTypes } = body;

        await this.createRoleUseCase.execute({
            key,
            userTypes
        });
    }

}