import { UserRepository } from '@application/repositories/user.repository';
import { CreateUserUseCase } from '@application/use-cases/user/create-user/create-user.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserSeeder {

    constructor(
        private userRepository: UserRepository,
        private createUserUseCase: CreateUserUseCase
    ) { }

    public async run() {
        await this.createAdminUser();
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
            type: 'ADMIN'
        });
    }

}