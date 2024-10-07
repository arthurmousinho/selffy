import { RoleRepository } from "@application/repositories/role.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountRolesUseCase {

    constructor(
        private roleRepository: RoleRepository
    ) { }

    public async execute(): Promise<number> {
        const count = await this.roleRepository.count();
        return count;
    }

}