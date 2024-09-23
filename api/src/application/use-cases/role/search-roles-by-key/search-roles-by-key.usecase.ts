import { RoleRepository } from "@application/repositories/role.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchRolesByKeyUseCase {
    
    constructor(
        private roleRepository: RoleRepository
    ) {}

    public async execute(key: string) {
        const rolesFound = await this.roleRepository.findManyByKey(key);
        return rolesFound;
    }

}
