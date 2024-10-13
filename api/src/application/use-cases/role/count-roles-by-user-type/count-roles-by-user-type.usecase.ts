import { UserType } from "@application/entities/user/user.entity";
import { RoleRepository } from "@application/repositories/role.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountRolesByUserTypeUseCase {

    constructor(
        private roleRepository: RoleRepository
    ) { }

    public async execute(userType: UserType): Promise<number> {
        const count = await this.roleRepository.countByUserType(userType);
        return count;
    }

}