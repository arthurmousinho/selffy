import { RoleRepository } from "@application/repositories/role.repository";
import { Injectable } from "@nestjs/common";

interface SearchRolesByKeyUseCaseRequest {
    key: string;
    page: number;
    limit: number;
}

@Injectable()
export class SearchRolesByKeyUseCase {
    
    constructor(
        private roleRepository: RoleRepository
    ) {}

    public async execute(request: SearchRolesByKeyUseCaseRequest) {
        const pageableRoles = await this.roleRepository.findManyByKey({
            ...request
        });
        return pageableRoles;
    }

}