import { Module } from '@nestjs/common';

import { CreateUserUseCase } from './create-user/create-user.usecase';
import { AuthUserUseCase } from './auth-user/auth-user.usecase';
import { FindAllUsersUseCase } from './find-all-users/find-all-users.usecase';
import { DeleteUserUsecase } from './delete-user/delete-user.usecase';
import { SearchUserByNameUseCase } from './search-user-by-name/search-user-by-name.usecase';
import { UpdateUserUseCase } from './update-user/update-user.usecase';
import { FindUserByIdUseCase } from './find-user-by-id/find-user-by-id.usecase';
import { CountUsersUseCase } from './count-users/count-users.usecase';
import { CountUsersByPlanUseCase } from './count-users-by-plan/count-users-by-plan.usecase';
import { RoleModule } from '../role/role.module';
import { JwtService } from '@nestjs/jwt';
import { CountUsersByTypeUseCase } from './count-users-by-type/count-users-by-type.usecase';
import { GetUserGrowthUseCase } from './get-user-growth/get-user-growth.usecase';
import { GetUsersInsightsUseCase } from './get-users-insights/get-users-insights.usecase';

@Module({
    imports: [
        RoleModule,
    ],
    providers: [
        JwtService,
        CreateUserUseCase,
        AuthUserUseCase,
        FindAllUsersUseCase,
        DeleteUserUsecase,
        SearchUserByNameUseCase,
        UpdateUserUseCase,
        FindUserByIdUseCase,
        CountUsersUseCase,
        CountUsersByPlanUseCase,
        CountUsersByTypeUseCase,
        GetUserGrowthUseCase,
        GetUsersInsightsUseCase
    ],
    exports: [
        CreateUserUseCase,
        AuthUserUseCase,
        FindAllUsersUseCase,
        DeleteUserUsecase,
        SearchUserByNameUseCase,
        UpdateUserUseCase,
        FindUserByIdUseCase,
        CountUsersUseCase,
        CountUsersByPlanUseCase,
        CountUsersByTypeUseCase,
        GetUserGrowthUseCase,
        GetUsersInsightsUseCase
    ]
})

export class UserModule { }