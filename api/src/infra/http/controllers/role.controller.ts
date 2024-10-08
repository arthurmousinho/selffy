import { CreateRoleUseCase } from "@application/use-cases/role/create-role/create-role.usecase";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateRoleBody } from "../dtos/role/create-role-body.dto";
import { FindAllRolesUseCase } from "@application/use-cases/role/find-all-roles/find-all-roles.usecase";
import { RoleViewModel } from "../view-models/role.viewmodel";
import { UpdateRoleBody } from "../dtos/role/update-role-body.dto";
import { UpdateRoleUseCase } from "@application/use-cases/role/update-role/update-role.usecase";
import { DeleteRoleUseCase } from "@application/use-cases/role/delete-role/delete-role.usecase";
import { SearchRolesByKeyUseCase } from "@application/use-cases/role/search-roles-by-key/search-roles-by-key.usecase";


@Controller('roles')
export class RoleController {

    constructor(
        private createRoleUseCase: CreateRoleUseCase,
        private findAllRolesUseCase: FindAllRolesUseCase,
        private updateRoleUseCase: UpdateRoleUseCase,
        private deleteRoleUseCase: DeleteRoleUseCase,
        private searchRolesByKeyUseCase: SearchRolesByKeyUseCase
    ) {}

    @Get()
    public async getRoles() {
        const roles = await this.findAllRolesUseCase.execute();
        return { roles: roles.map(RoleViewModel.toHTTP) };
    }

    @Get(':key')
    public async searchByKey(@Param('key') key: string) {
        const rolesFound = await this.searchRolesByKeyUseCase.execute(key);
        return { roles: rolesFound.map(RoleViewModel.toHTTP) };
    }

    @Post()
    public async create(@Body() body: CreateRoleBody) {
        const { key, userTypes } = body;

        await this.createRoleUseCase.execute({
            key,
            userTypes
        });
    }

    @Put()
    public async update(@Body() body: UpdateRoleBody) {
        const { id ,key, userTypes } = body;

        await this.updateRoleUseCase.execute({
            id,
            key,
            userTypes
        });
    }

    @Delete(':id')
    public async delete(@Param('id') id: string) {
        await this.deleteRoleUseCase.execute(id);
    }

}