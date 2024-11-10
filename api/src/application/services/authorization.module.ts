import { UserModule } from '@application/use-cases/user/user.module';
import { Module } from '@nestjs/common';
import { ProjectAuthorizationService } from './project-authorization.service';

@Module({
    imports: [
        UserModule
    ],
    providers: [
        ProjectAuthorizationService
    ],
    exports: [
        ProjectAuthorizationService
    ]
})

export class AuthorizationModule { }