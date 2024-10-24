import { CreateRoleUseCase } from "@application/use-cases/role/create-role/create-role.usecase";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateRoleBody } from "../dtos/role/create-role-body.dto";
import { FindAllRolesUseCase } from "@application/use-cases/role/find-all-roles/find-all-roles.usecase";
import { RoleViewModel } from "../view-models/role.viewmodel";
import { UpdateRoleBody } from "../dtos/role/update-role-body.dto";
import { UpdateRoleUseCase } from "@application/use-cases/role/update-role/update-role.usecase";
import { DeleteRoleUseCase } from "@application/use-cases/role/delete-role/delete-role.usecase";
import { SearchRolesByKeyUseCase } from "@application/use-cases/role/search-roles-by-key/search-roles-by-key.usecase";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UserTypeGuard } from "../guards/user-type.guard";

@UseGuards(JwtAuthGuard, new UserTypeGuard('ADMIN'))
@Controller('roles')
export class RoleController {

    constructor(
        private createRoleUseCase: CreateRoleUseCase,
        private findAllRolesUseCase: FindAllRolesUseCase,
        private updateRoleUseCase: UpdateRoleUseCase,
        private deleteRoleUseCase: DeleteRoleUseCase,
        private searchRolesByKeyUseCase: SearchRolesByKeyUseCase
    ) { }

    @Get()
    public async getRoles(@Query('page') page = 1, @Query('limit') limit = 10) {
        const pageableRoles = await this.findAllRolesUseCase.execute(
            Number(page),
            Number(limit)
        );
        return {
            roles: pageableRoles.data.map(RoleViewModel.toHTTP),
            meta: pageableRoles.meta
        };
    }

    @Get(':key')
    public async searchByKey(
        @Param('key') key: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        const pageableRoles = await this.searchRolesByKeyUseCase.execute({
            key,
            page: Number(page),
            limit: Number(limit)
        });
        return {
            roles: pageableRoles.data.map(RoleViewModel.toHTTP),
            meta: pageableRoles.meta
        };
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
        const { id, key, userTypes } = body;

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