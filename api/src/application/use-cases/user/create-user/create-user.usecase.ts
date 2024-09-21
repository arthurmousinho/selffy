import { Role } from "@application/entities/role/role";
import { User } from "@application/entities/user/user";
import { UserAlreadyExistsError } from "@application/errors/user/user-already-exists.error";
import { UserRepository } from "@application/repositories/user.repository";
import { Injectable } from "@nestjs/common";

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

interface CreateUserResponse {
    user: User;
}

@Injectable()
export class CreateUserUseCase {

    constructor(
        private userRepository: UserRepository
    ) {}

    public async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
        const { name, email, password } = request;

        const userAlreadyExists = await this.userRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new UserAlreadyExistsError();
        }

        const user = new User({ 
            name, 
            email, 
            password, 
            roles: [ 
                new Role({ key: 'user.update' }),
                new Role({ key: 'user.delete' }),
            ]
        });

        await this.userRepository.create(user);

        return { user };
    }

}