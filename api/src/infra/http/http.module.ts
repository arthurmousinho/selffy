import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '@application/use-cases/user/create-user/create-user.usecase';
import { AuthUserUseCase } from '@application/use-cases/user/auth-user/auth-user.usecase';
import { JwtService } from '@nestjs/jwt';
import { FindAllUsersUseCase } from '@application/use-cases/user/find-all-users/find-all-users.usecase';
import { DeleteUserUsecase } from '@application/use-cases/user/delete-user/delete-user.usecase';
import { SearchUserByNameUseCase } from '@application/use-cases/user/search-user-by-name/search-user-by-name.usecase';
import { UpdateUserUseCase } from '@application/use-cases/user/update-user/update-user.usecase';
import { CreateRoleUseCase } from '@application/use-cases/role/create-role/create-role.usecase';
import { RoleController } from './controllers/role.controller';
import { FindAllRolesUseCase } from '@application/use-cases/role/find-all-roles/find-all-roles.usecase';
import { UpdateRoleUseCase } from '@application/use-cases/role/update-role/update-role.usecase';
import { DeleteRoleUseCase } from '@application/use-cases/role/delete-role/delete-role.usecase';
import { SearchRolesByKeyUseCase } from '@application/use-cases/role/search-roles-by-key/search-roles-by-key.usecase';
import { GetRolesForUserTypeUseCase } from '@application/use-cases/role/get-roles-for-user-type/get-roles-for-user-type';
import { ProjectController } from './controllers/project.controller';
import { CreateProjectUseCase } from '@application/use-cases/project/create-project/create-project.usecase';
import { FindUserByIdUseCase } from '@application/use-cases/user/find-user-by-id/find-user-by-id.usecase';
import { FindAllProjectsUseCase } from '@application/use-cases/project/find-all-projects/find-all-projects.usecase';
import { DeleteProjectUseCase } from '@application/use-cases/project/delete-project/delete-project.usecase';
import { UpdateProjectUseCase } from '@application/use-cases/project/update-project/update-project.usecase';
import { AdminDashboardController } from './controllers/admin-dashboard.controller';
import { CountUsersUseCase } from '@application/use-cases/user/count-users/count-users.usecase';
import { CountProjectsUseCase } from '@application/use-cases/project/count-projects/count-projects.usecase';
import { GetTotalRevenueUseCase } from '@application/use-cases/project/get-total-revenue/get-total-revenue.usecase';
import { SearchProjectByTitleUseCase } from '@application/use-cases/project/search-project-by-title/search-project-by-title.usecase';
import { CountUsersByPlanUseCase } from '@application/use-cases/user/count-users-by-plan/count-users-by-plan.usecase';
import { CountProjectByStatusUseCase } from '@application/use-cases/project/count-projects-by-status/count-projects-by-status.usecase';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    UserController,
    RoleController,
    ProjectController,
    AdminDashboardController
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

    CreateRoleUseCase,
    FindAllRolesUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    SearchRolesByKeyUseCase,
    GetRolesForUserTypeUseCase,

    CreateProjectUseCase,
    FindAllProjectsUseCase,
    DeleteProjectUseCase,
    UpdateProjectUseCase,
    CountProjectsUseCase,
    GetTotalRevenueUseCase,
    SearchProjectByTitleUseCase,
    CountProjectByStatusUseCase
  ]
})
export class HttpModule { }