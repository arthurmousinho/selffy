import { User, UserType, PlanType } from "@application/entities/user/user.entity";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UserRepository } from "@application/repositories/user.repository";
import { GetRolesForUserTypeUseCase } from "@application/use-cases/role/get-roles-for-user-type/get-roles-for-user-type";
import { Injectable } from "@nestjs/common";

interface UpdateUserUseCaseRequest {
    id: string;
    name: string;
    email: string;
    type: UserType;
    plan: PlanType;
}

@Injectable()
export class UpdateUserUseCase {

    constructor(
        private userRepository: UserRepository,
        private getRolesForUserTypeUseCase: GetRolesForUserTypeUseCase
    ) { }

    public async execute(request: UpdateUserUseCaseRequest): Promise<void> {
        const { id, name, email, type, plan } = request;
        const userExists: User | null = await this.userRepository.findById(id);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        let roles = userExists.getRoles();
        if (userExists.getType() !== type) {
            roles = await this.getRolesForUserTypeUseCase.execute(type);
        }

        const userInstance = new User({
            name,
            email,
            password: userExists.getPassword(),
            type,
            createdAt: userExists.getCreatedAt(),
            updatedAt: new Date(),
            plan,
            roles
        }, id);

        await this.userRepository.update(userInstance);
    }

}