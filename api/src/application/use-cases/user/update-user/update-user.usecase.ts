import { User } from "@application/entities/user/user";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UserRepository } from "@application/repositories/user.repository";
import { Injectable } from "@nestjs/common";

interface UpdateUserUseCaseRequest {
    id: string;
    name: string;
    email: string;
}

@Injectable()
export class UpdateUserUseCase {
    
    constructor(
        private userRepository: UserRepository
    ) { }

    public async execute(request: UpdateUserUseCaseRequest): Promise<void> {
        const { id, name, email } = request;
        const userExists: User | null = await this.userRepository.findById(id);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        const userInstance = new User({
            name,
            email,
            password: userExists.getPassword(),
            type: userExists.getType(),
            createdAt: userExists.getCreatedAt(),
            updatedAt: new Date(),
        }, id);

        await this.userRepository.update(userInstance);
    }

}