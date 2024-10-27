import { Role, User } from "@application/entities/user/user.entity";
import { UserAlreadyExistsError } from "@application/errors/user/user-already-exists.error";
import { UserRepository } from "@application/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    role: Role;
}

interface CreateUserResponse {
    user: User;
}

@Injectable()
export class CreateUserUseCase {

    constructor(
        private userRepository: UserRepository,
    ) {}

    public async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
        const { name, email, password, role } = request;

        const userAlreadyExists = await this.userRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new UserAlreadyExistsError();
        }

        const hashedPassword = await this.hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
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