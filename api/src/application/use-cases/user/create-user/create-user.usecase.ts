import { User, UserType } from "@application/entities/user/user.entity";
import { UserAlreadyExistsError } from "@application/errors/user/user-already-exists.error";
import { UserRepository } from "@application/repositories/user.repository";
import { GetRolesForUserTypeUseCase } from "@application/use-cases/role/get-roles-for-user-type/get-roles-for-user-type";
import { Injectable } from "@nestjs/common";
import { PlanType } from "@prisma/client";
import * as bcrypt from 'bcryptjs';

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    type: UserType;
    plan: PlanType;
}

interface CreateUserResponse {
    user: User;
}

@Injectable()
export class CreateUserUseCase {

    constructor(
        private userRepository: UserRepository,
        private getRolesForUserTypeUseCase: GetRolesForUserTypeUseCase,
    ) {}

    public async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
        const { name, email, password, type, plan } = request;

        const userAlreadyExists = await this.userRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new UserAlreadyExistsError();
        }

        const hashedPassword = await this.hashPassword(password);

        const roles = await this.getRolesForUserTypeUseCase.execute(type);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            type,
            roles,
            plan
        });

        await this.userRepository.create(newUser);
        
        return { user: newUser };
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

}