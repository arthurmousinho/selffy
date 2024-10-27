import { Role, User } from "@application/entities/user/user.entity";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UserRepository } from "@application/repositories/user.repository";
import { Injectable } from "@nestjs/common";

interface UpdateUserUseCaseRequest {
    id: string;
    name: string;
    email: string;
    role: Role;
}

@Injectable()
export class UpdateUserUseCase {

    constructor(
        private userRepository: UserRepository
    ) { }

    public async execute(request: UpdateUserUseCaseRequest): Promise<void> {
        const userExists: User | null = await this.userRepository.findById(request.id);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        const userInstance = new User({
            name: request.name,
            email: request.email,
            password: userExists.getPassword(),
            role: request.role,
            createdAt: userExists.getCreatedAt(),
            updatedAt: new Date(),
        }, request.id);
        
        await this.userRepository.update(userInstance);
    }

}