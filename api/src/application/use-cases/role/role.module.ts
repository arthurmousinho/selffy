import { Module } from '@nestjs/common';
import { CreateRoleUseCase } from './create-role/create-role.usecase';
import { FindAllRolesUseCase } from './find-all-roles/find-all-roles.usecase';
import { UpdateRoleUseCase } from './update-role/update-role.usecase';
import { DeleteRoleUseCase } from './delete-role/delete-role.usecase';
import { SearchRolesByKeyUseCase } from './search-roles-by-key/search-roles-by-key.usecase';
import { GetRolesForUserTypeUseCase } from './get-roles-for-user-type/get-roles-for-user-type';
import { CountRolesUseCase } from './count-roles/count-roles.usecase';

@Module({
    providers: [
        CreateRoleUseCase,
        FindAllRolesUseCase,
        UpdateRoleUseCase,
        DeleteRoleUseCase,
        SearchRolesByKeyUseCase,
        GetRolesForUserTypeUseCase,
        CountRolesUseCase
    ],
    exports: [
        CreateRoleUseCase,
        FindAllRolesUseCase,
        UpdateRoleUseCase,
        DeleteRoleUseCase,
        SearchRolesByKeyUseCase,
        GetRolesForUserTypeUseCase,
        CountRolesUseCase
    ]
})

export class RoleModule { }