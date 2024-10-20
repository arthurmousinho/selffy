import { PlanType, UserType } from '@application/entities/user/user.entity';
import { UserRepository } from '@application/repositories/user.repository';
import { CreateUserUseCase } from '@application/use-cases/user/create-user/create-user.usecase';
import { Injectable } from '@nestjs/common';
import { MOCK_USERS } from 'src/mocks/user.mock';

@Injectable()
export class UserSeeder {

    constructor(
        private userRepository: UserRepository,
        private createUserUseCase: CreateUserUseCase
    ) { }

    public async run() {
        if (await this.userRepository.count() > 0) {
            return;
        }

        await this.createAdminUser();


        // TODO: Create createMany() in UserRepository
        MOCK_USERS.map(async (user) => {
            await this.createUserUseCase.execute({
                name: user.name,
                email: user.email,
                password: user.password,
                type: user.userType as UserType,
                plan: user.plan as PlanType
            })
        })
    }

    private async createAdminUser() {
        const adminUserAlreadyExists = await this.userRepository.findByEmail('admin@selffy.com');
        if (adminUserAlreadyExists) {
            return;
        }

        await this.createUserUseCase.execute({
            name: 'Admin',
            email: 'admin@selffy.com',
            password: 'admin123',
            type: 'ADMIN',
            plan: 'PREMIUM'
        });
    }

}