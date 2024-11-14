import { Role, User } from "@domain/entities/user/user.entity";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UserRepository } from "@domain/repositories/user.repository";
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

        let userInstance: User;
        const mustUpdateOnlySelf = userExists.getRole() === 'FREE' || userExists.getRole() === 'PREMIUM'

        if (mustUpdateOnlySelf) {
            userInstance = new User({
                name: request.name,
                email: request.email,
                password: userExists.getPassword(),
                role: userExists.getRole(),
                createdAt: userExists.getCreatedAt(),
                updatedAt: new Date(),
            }, request.id);

            await this.userRepository.update(userInstance);
            return;
        }

        userInstance = new User({
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